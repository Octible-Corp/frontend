const express = require('express');
const { connectDB } = require('./config/mongo');
const { connectSMTP } = require('./config/nodemailer');
const app = express();
var cors = require('cors');

// Connect Mongo Database
connectDB();

// Connect SMTP
connectSMTP();

//Cores
app.use(cors());

// Init Middleware
app.use(express.json());

//Main
app.use('/', require('./api/Menus'));

//Listen on port 5000 (local) or env.PORT for (production)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
