const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
//const localhost = 'localhost:5000';
const serverIP = 'localhost:5000';

// @route    POST api/users
// @desc     Set user passwords (Step 1)
// @access   Public
router.post(
  '/step_1',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, password, password2 } = req.body;
    if (password !== password2) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Passwords dont match' }] });
    }
    try {
      let user = await User.findById(user_id);

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //console.log('Verify user');
      const payload = {
        user: {
          id: user.id
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

// @route    POST api/users
// @desc     Send Verification Email
// @access   Public
router.post(
  '/',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        email
      });

      await user.save();

      //console.log('Verify user');
      const id = user._id;

      //console.log(user);
      try {
        if (!email) {
          console.log('No email provided!!!!!!!!!!!');
        } else {
          const conf = `https://${serverIP}/api/auth/confirm/${id}`;
          const output = `
          <p>In order to use our services, we ensure our users have verified emails. Please click <a href = ${conf}>
          here</a>, or the button below, to get started with us!</p>
        `;
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
         
          <p>In order to use our services, we ensure our users have verified emails. Please click <a href = ${conf}>
          here</a>, or the button below, to get started with us!</p>
            <p>
              <a href = ${conf}>
            <button> Verify Email </button>
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
          console.log('Trying on 288');
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
            subject: 'Please Verify Your Email', // Subject line
            text: 'Hello world?', // plain text body
            html: actualOutput // html body
          };
          // send mail with defined transport object
          console.log('Trying to send....');
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return;
            }
            //console.log('Message sent: %s', info.messageId);
            //res.render('contact', { msg: 'Email has been sent' });
          });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      res.json({ msg: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
