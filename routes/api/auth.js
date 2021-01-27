const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Menu = require('../../models/Menu');
const nodemailer = require('nodemailer');

//const localhost = 'localhost:5000';
const serverIP = 'octible.io';
// @route    GET api/auth
// @desc     Login User
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user.isVerified) {
      res.json({ msg: false });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth/changepass
// @desc     Reset password
// @access   Public
router.post('/changepass', async (req, res) => {
  //get user
  try {
    //console.log('Reset password API');
    const user_id = req.body.id;
    let newPass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    newPass = await bcrypt.hash(newPass, salt);
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { password: newPass }
    );
    //console.log(user);
    await user.save();
    //res.redirect('http://octible.io/login');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth/reset:id
// @desc     Get user ID to reset password
// @access   Public
router.get('/reset/:id', async (req, res) => {
  //get user
  //console.log('Get user ID to reset password');
  const user_id = req.params.id;
  try {
    //respond with reset link
    //res.json({ id: user_id });
    res.redirect(`http://${serverIP}/resetpsw/${user_id}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/verify
// @desc     Verify user by email
// @access   Public
router.get('/verify', async (req, res) => {
  //get user
  //console.log('Trying...');
  const user_id = req.params.id;
  const user = await User.findOneAndUpdate(
    { user: user_id },
    { isVerified: true }
  );
  await user.save();
  try {
    //respond with redirect liink
    res.redirect(`http://${serverIP}/login`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/forgot
// @desc     Send forgot password email
// @access   Public
router.post('/forgot', async (req, res) => {
  //get user email
  //console.log(req.body);
  const email = req.body.email;
  //console.log(email);
  //Send email
  let ID = null;
  try {
    const user = await User.findOne({ email });
    if (!email) {
      console.log('No email provided!!!!!!!!!!!');
    } else {
      if (!user) {
        console.log('No user associated with given email!!!!');
      } else {
        ID = user.id;
        const goTo = `https://${serverIP}/api/auth/reset/${ID}`;
        const output = `
      <p>Hi there! It seems that you asked to reset your password. Please click <a href = ${goTo}>
      here</a>, or the button below, to reset it.</p>`;
        const actualOutput = `<!DOCTYPE html>
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
      <h3><strong>Thank you for signing up with Octible!</strong> </h3>
      ${output}
        <p>
          <a href = ${goTo}>
        <button> Reset Password </button>
          </a>
            </p>
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
      </html>`;
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
          to: email, // list of receivers
          subject: 'A Password Reset Has Been Requested', // Subject line
          text: 'Hello world?', // plain text body
          html: actualOutput // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return; //console.log(error);
          }
          //console.log('Message sent: %s', info.messageId);
          res.json({ msg: 'Password reset email has been sent' });
          return;
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    //console.log('Logging in..');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if (!user.isVerified) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email not verified' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          isVerified: user.isVerified
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// @route    DELETE api/profile
// @desc     Delete user & menus
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Menu.deleteMany({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/update_step', auth, async (req, res) => {
  try {
    const step = req.body.step;

    const user_id = req.user.id;
    const user = await User.findById({ _id: user_id });
    user.step_tracker = step;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
