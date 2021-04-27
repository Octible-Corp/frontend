const express = require('express');
const router = express.Router();
const config = require('config');
const { db } = require('../config/mongo');

router.post('/get_menu', async (req, res) => {
  try {
    const { restaurant_id } = req.body;
    let menu = await db()
      .collection('menus')
      .find({ restaurant_id: restaurant_id, active: true })
      .next();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return;
});

module.exports = router;
