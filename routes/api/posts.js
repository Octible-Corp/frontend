const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const blobStream = require('blob-stream');
const Photo = require('../../models/Photo');
const AddPhoto = require('../../models/AddPhoto');
const User = require('../../models/User');
const Menu = require('../../models/Menu');
const MenuV2 = require('../../models/MenuV2');
const checkObjectId = require('../../middleware/checkObjectId');
const uniqueString = require('unique-string');
// Filesystem stuff
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
let QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
var convertapi = require('convertapi')('E10KXvGdecacvr9o');
const nodemailer = require('nodemailer');
const https = require('https');

//const localhost = 'localhost:5000';
const serverIP = 'octible.io';

//var blobStream = require('blob-stream');
AWS.config.update({
  accessKeyId: 'AKIARIRKFSJMZMPIFA7X',
  secretAccessKey: '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',
  region: 'us-east-2',
  signatureVersion: 'v4'
});

// @route    GET api/posts these are random notes not run by the comp
// @desc     Get all posts
// @access   Private
router.post('/menus', auth, async (req, res) => {
  try {
    const posts = await MenuV2.find({ user: req.body.id });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/activate', auth, async (req, res) => {
  try {
    const menu = await MenuV2.findOne({ _id: req.body.id });
    if (menu.active === true) {
      menu.active = false;
      await menu.save();
    } else {
      menu.active = true;
      await menu.save();
    }
    res.json({ _id: menu._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/test', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const menu = await Menu.find({ user: userID }).sort({ _id: -1 }).limit(1);
    const file = menu[0].codes;
    res.type = 'application/pdf';
    res.download(`./pdfs/${file}.pdf`, `${file}.pdf`);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/newMenu', auth, async (req, res) => {
  const menuId = req.body.menuId;
  const userId = req.user.id;
  const s3Folder = req.user.id;
  const s3 = new AWS.S3({
    accessKeyId: 'AKIARIRKFSJMZMPIFA7X',
    secretAccessKey: '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'
  });
  if (menuId === 'New') {
    const qrId = uniqueString();
    const path = `./qrCodes/${qrId}`;
    try {
      //Find the photos there were previousely uploaded

      const start = async () => {
        const photos = await Photo.find({ user: userId, staging: true });
        const user = await User.findById(req.user.id).select('-password');
        const imgList = [];
        photos.forEach((element) => {
          if (element.name.includes('.png')) {
            imgList.push(element.name);
            element.staging = false;
            (async () => {
              await element.remove();
            })();
          }
        });

        for (const element of photos) {
          if (element.name.includes('.pdf')) {
            const inFile = `https://octible.s3.us-east-2.amazonaws.com/${userId}/${element.name}`;
            result = await convertapi.convert('png', { File: inFile }, 'pdf');
            for (const file of result.files) {
              imgList.push(file.fileInfo.FileName);
              let filePath = `./staging/${file.fileInfo.FileName}`;
              const streamToFile = (filePath) => {
                return new Promise((resolve, reject) => {
                  const imgRes = fs.createWriteStream(filePath);
                  https.get(`${file.fileInfo.Url}`, function (response) {
                    response
                      .pipe(imgRes)
                      .on('finish', resolve)
                      .on('error', reject);
                  });
                });
              };
              await streamToFile(filePath);
              const data = await readFileAsync(
                `./staging/${file.fileInfo.FileName}`
              );
              const params = {
                Bucket: 'octible',
                Key: `${s3Folder}/${file.fileInfo.FileName}`,
                Body: data
              };
              await s3.upload(params).promise();
              (async () => {
                fs.unlink(`./staging/${file.fileInfo.FileName}`, (err) => {
                  if (err) return console.log(err);
                });
              })();
            }
          }
        }
        (async () => {
          for (const element of photos) {
            await element.remove();
          }
        })();

        const returned = {
          user: user,
          imgList: imgList
        };
        return returned;
      };
      start().then(async (returned) => {
        newMenu = new Menu({
          user: userId,
          name: 'Menu',
          codes: qrId,
          photos: returned.imgList
        });
        newMenu.save();

        if (returned.user.url === 'null') {
          //Create QR codes

          QRCode.toFile(path, qrId + '.png');
          const qrBase64 = await QRCode.toDataURL(
            `http://${serverIP}/api/posts/menu/` + userId
          );
          (async () => {
            fs.unlink(path, (err) => {
              if (err) return console.log(err);
            });
          })();
          //Write to pdf
          try {
            const doc = new PDFDocument();
            // Fit the image within the dimensions
            const NUM_QR = 9;
            for (let k = 0; k < NUM_QR / 3; k++) {
              for (let i = 0; i < NUM_QR / 3; i++) {
                doc
                  .image(qrBase64, 20 + 190 * i, 50 + 220 * k, {
                    fit: [180, 180]
                  })
                  .stroke();
              }
            }
            // Stream contents to a file

            doc
              .pipe(fs.createWriteStream(`./pdfs/${qrId}.pdf`))
              .on('finish', async () => {
                console.log('On Finish');
                const data = await readFileAsync(`./pdfs/${qrId}.pdf`);
                const params = {
                  Bucket: 'octible',
                  Key: `${s3Folder}/qr/${qrId}.pdf`,
                  Body: data
                };

                await s3.upload(params).promise();
                const newUrl = `https://octible.s3.us-east-2.amazonaws.com/${userId}/qr/${qrId}.pdf`;
                returned.user.url = newUrl;
                const user = returned.user;
                await returned.user.save();
                const resp = {
                  newMenu,
                  user
                };
                res.json(resp);
                (async () => {
                  const pdfPath = `./pdfs/${qrId}.pdf`;
                  fs.unlink(pdfPath, (err) => {
                    if (err) return console.log(err);
                  });
                })();
              });
            // Close PDF and write file.
            doc.end();
          } catch (err) {
            console.log('PDF ERROR!!!!');
            console.log(err);
          }
        } else {
          console.log('Nope send the menu');
          const resp = {
            newMenu
          };
          res.json(resp);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    console.log('added');
    try {
      const photos = await AddPhoto.find({ user: userId, staging: true });
      const menuId = photos[0].menuId;
      const imgList = [];

      photos.forEach((element, index, array) => {
        imgList.push(element.name);
        element.staging = false;
        (async () => {
          await element.save();
        })();
      });

      const menu = await Menu.findOneAndUpdate(
        { user: userId, _id: menuId },
        { $push: { photos: imgList } }
      );

      await menu.save();
      //console.log(menu);
      res.json({ id: menuId, newImg: imgList });
      //res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

//Add new photo to menu
router.get('/newPhoto', auth, async (req, res) => {
  //console.log('Get new menu');
  try {
    const userID = req.user.id;
    const photos = await AddPhoto.find({ user: userID, staging: true });
    const menId = photos[0].menId;
    const imgList = [];

    photos.forEach((element, index, array) => {
      imgList.push(element.name);
      element.staging = false;
      (async () => {
        await element.save();
      })();
    });
    //console.log(imgList);
    const menu = await Menu.findOneAndUpdate(
      { user: userID, menId: menId },
      { $push: { photos: imgList } }
    );
    await menu.save();
    //console.log(menu);
    res.json({ id: menId, newImg: imgList });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/menu/:id
// @desc     Get menu by ID
// @access   Private
router.get('/menu/:id', async (req, res) => {
  try {
    const user = req.params.id;
    const photos = [];
    const menus = await Menu.find({ user: user, active: true });
    menus.map((menu) => {
      menu.photos.map((img) => {
        photos.push(img);
      });
    });
    const html = [];
    photos.forEach((element) => {
      html.push(
        `<img src=https://octible.s3.us-east-2.amazonaws.com/${user}/${element}>`
      );
    });
    const joined_html = html.join(` `);
    res.set('Content-Type', 'text/html');
    const string = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
      </head>
      <div style='height: 100%; width: 100%;'>
        ${joined_html}
      </div>
    </html>`;
    res.send(new Buffer(string));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/delete/:id
// @desc     Delete a menu __IN_USE__
// @access   Private
router.post('/delete', auth, async (req, res) => {
  try {
    const id = req.body.id;
    const menu = await MenuV2.findOne({ _id: id });
    //console.log(menu);
    if (!menu) {
      return res.status(404).json({ msg: 'Menu not found' });
    }
    // Check user
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await menu.remove();

    res.json({ id: id });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/deletePhoto/:menuId/:src
// @desc     Delete a photo
// @access   Private
router.delete('/deletePhoto/:menuId/:src', auth, async (req, res) => {
  try {
    //console.log('API delete photo...');
    const menuId = req.params.menuId;
    const src = req.params.src;
    //console.log(menuId + ', ' + src);
    const menu = await Menu.findOne({ menId: menuId });
    //console.log(menu);
    if (!menu) {
      return res.status(404).json({ msg: 'Menu not found' });
    }
    // Pull out photo
    const photo = menu.photos.find((photo) => photo === src);
    //console.log(photo);
    menu.photos = menu.photos.filter((photo) => photo !== src);
    res.json({ src: photo, menuId: menuId });
    await menu.save();
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/feedback/:request
// @desc     Give us feedback
// @access   Private
router.post(
  '/feedback/:request',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const text = req.body.text
        .replace('<', 'XSS ALERT')
        .replace('>', 'XSS ALERT');
      const email = user.email;
      const date = new Date();
      const time =
        date.getMonth() +
        '/' +
        date.getDay() +
        '/' +
        date.getFullYear() +
        ' at ' +
        date.getHours() +
        ':' +
        (date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()) +
        '.';
      if (!email) {
        console.log('No email provided!!!!!!!!!!!');
      } else {
        const output1 = `
        <p>Hi there! A user with the email of ${email} submitted the following feedback on ${time}</p>
        <p>${text}</p>
        <p> Use this feedback as you see fit! </p>
        `;
        let actualOutput = `<!DOCTYPE html>
        <head>
          <style>
          body {
          background-color: #4C9AFF;
          }
            h1 {
            text-align: center;
            color: white;
            }
            p {
            text-align: center;
            }
            h3 {
            text-align: center;
            }
            button {
            background-color: #4C9AFF;
            width: 200px;
            height: 70px;
            color: white;
            font-size: 25px;
            border-radius:60px;
            }
            a {
            color: white;
            font-size: 25px;
            }
          </style>
        <body>
        <h1>Octible</h1>
        <table style="background-color: #ffffff; border-radius: 30px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="15px" bgcolor="#ffffff">
        <tbody>
        <tr>
        <td class="esd-block-text es-p40t es-p10b es-p40r es-p40l" align="left" bgcolor="transparent">
        <h3><strong>Thank you for choosing Octible!</strong> </h3>
        ${output1}
        <p>&nbsp;</p>
        <p>Sincerely,</p>
          <p> <i>The Octible Developement Team</i> </p>
        </td>
        </tr>
        <tr>
        
        </tr>
        </tbody>
        </table>
          </body>
          </head>
        </html>                                                                           `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'octible@gmail.com', // generated ethereal user
            pass: '123Octible123' // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Octible" <octible@gmail.com>', // sender address
          to: ['nathanielshalev@gmail.com'], // list of receivers
          subject: 'New Feedback From User', // Subject line
          text: 'Hello world?', // plain text body
          html: actualOutput // html body
        };
        // setup email data with unicode symbols
        let mailOptions2 = {
          from: '"Octible" <octible@gmail.com>', // sender address
          to: email, // list of receivers,
          subject: 'Feedback Was Submitted!', // Subject line
          text: 'Hello world?', // plain text body
          html: actualOutput // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions2, (error, info) => {
          if (error) {
            return; //console.log(error);
          }
          console.log('Message sent to user: %s', info.messageId);
          res.json({ msg: 'Feedback email has been sent to user' });
          return;
        });
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('Message sent to us: %s', info.messageId);
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts/qr
// @desc     Generate QR code and download PDF
// @access   Private

router.put('/qr', auth, async (req, res) => {
  console.log('QR Action Fired...');
  try {
    //This below action fires every time you press the button
    //QR stuff
    const qrId = uniqueString();
    const path = `./qrCodes/${qrId}.png`;
    QRCode.toFile(path, qrId + '.png');
    const qrBase64 = await QRCode.toDataURL(qrId + '.png');
    //PDF Stuff
    console.log('Creating PDF');
    try {
      const doc = new PDFDocument();
      const stream = doc.pipe(blobStream());
      // Fit the image within the dimensions
      const NUM_QR = 9;
      for (let k = 0; k < NUM_QR / 3; k++) {
        for (let i = 0; i < NUM_QR / 3; i++) {
          doc
            .image(qrBase64, 20 + 190 * i, 50 + 220 * k, { fit: [180, 180] })
            .stroke();
        }
      }
      // Stream contents to a file
      doc
        .pipe(fs.createWriteStream(`./pdfs/${qrId}.pdf`))
        .on('finish', function () {
          console.log('On Finish');
        });
      // Close PDF and write file.
      doc.end();
      console.log('Downloaded on Server');
    } catch (err) {
      console.log('PDF ERROR!!!!');
      console.log(err);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/photos
// @desc     Send back photos of menu that was just created
// @access   Private
router.put('/photos', auth, async (req, res) => {
  try {
    const userID = req.user.id;

    //Find the menu that is most recently created
    //menu = await Menu.findOne({ user: userID }).sort({ _id: -1 }).limit(1);

    const id = '5ef7b8a26cb7146319cd5f52';
    let menu = await Menu.findById(id);

    //Get id of photos in menu
    const photos = menu.photos;
    //console.log(photos);
    photos.forEach((p) => {
      file = fs.readFileSync(__dirname + `/../../uploads/${p}.png`);
      res.write(file);

      //res.write(file);
    });

    //end the response process
    res.end();
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post('/upload', auth, async (req, res) => {
  const fileType = req.body.type;
  const name = `${uniqueString()}${fileType}`;
  const s3Folder = req.user.id;
  const user = s3Folder;
  const menuId = req.body.menuId;
  if (menuId === 'New') {
    newPhoto = new Photo({
      user: user,
      name: name
    });
    newPhoto.save();
  } else {
    newAddPhoto = new AddPhoto({
      user: user,
      name: name,
      menuId: menuId
    });
    newAddPhoto.save();
  }
  const params = {
    Bucket: 'octible',
    Fields: {
      Key: `${s3Folder}/${name}`
    }
  };
  const options = {
    signatureVersion: 'v4',
    region: 'us-east-2',
    endpoint: new AWS.Endpoint('https://octible.s3.amazonaws.com/'),
    useAccelerateEndpoint: false,
    s3ForcePathStyle: true
  };
  const client = new AWS.S3(options);
  const form = await new Promise((resolve, reject) => {
    client.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  form.url = 'https://octible.s3.amazonaws.com/';
  console.log('Upload Complete');
  return res.json(form);
});

router.post('/s3', auth, async (req, res) => {
  const s3Folder = req.body.user_id;
  const uploadType = req.body.uploadType;
  const name = `${uniqueString()}${uploadType}`;
  const params = {
    Bucket: 'octible',
    Fields: {
      Key: `${s3Folder}/${name}`
    }
  };
  const options = {
    signatureVersion: 'v4',
    region: 'us-east-2',
    endpoint: new AWS.Endpoint('https://octible.s3.amazonaws.com/'),
    useAccelerateEndpoint: false,
    s3ForcePathStyle: true
  };
  const client = new AWS.S3(options);
  const form = await new Promise((resolve, reject) => {
    client.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  form.url = 'https://octible.s3.amazonaws.com/';
  return res.json(form);
});

router.post('/change_name', auth, async (req, res) => {
  console.log(req.body.name);
  try {
    const menu = await Menu.findOneAndUpdate(
      { _id: req.body.menuId },
      { name: req.body.name }
    );

    await menu.save();
    res.json({ _id: menu._id, name: req.body.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/save_step', auth, async (req, res) => {
  if (req.body._id === '') {
    newMenuV2 = new MenuV2({
      user: req.body.user,
      restaurant: req.body.restaurant,
      website: req.body.website,
      active: false,
      main_photo: req.body.main_photo,
      pdf: req.body.main_photo,
      sections: [],
      items: []
    });
    await newMenuV2.save();
    res.json(newMenuV2);
  } else {
    const newMenuV2 = await MenuV2.findOneAndUpdate(
      { _id: req.body._id },
      {
        user: req.body.user,
        restaurant: req.body.restaurant,
        website: req.body.website,
        active: req.body.active,
        main_photo: req.body.main_photo,
        pdf: req.body.main_photo,
        sections: req.body.sections,
        items: req.body.items
      }
    );
    await newMenuV2.save();
    res.json(newMenuV2);
  }
});

router.post('/step_one', auth, async (req, res) => {
  if (req.body._id !== 'New') {
    const newMenuV2 = await MenuV2.findOneAndUpdate(
      { _id: req.body._id },
      {
        user: req.body.user,
        restaurant: req.body.restaurant,
        website: req.body.website,
        active: req.body.active,
        main_photo: req.body.main_photo,
        pdf: req.body.main_photo,
        sections: req.body.sections,
        items: req.body.items
      }
    );
    await newMenuV2.save();
    res.json(newMenuV2);
  } else {
    newMenuV2 = new MenuV2({
      user: req.body.user,
      restaurant: req.body.restaurant,
      website: req.body.website,
      active: false,
      main_photo: req.body.main_photo,
      pdf: req.body.main_photo,
      sections: [],
      items: []
    });
    await newMenuV2.save();
    res.json(newMenuV2);
  }
});

router.post('/step_two', auth, async (req, res) => {
  const newMenuV2 = await MenuV2.findOneAndUpdate(
    { _id: req.body._id },
    {
      sections: req.body.sections
    }
  );
  await newMenuV2.save();
  res.json(newMenuV2);
});

module.exports = router;
