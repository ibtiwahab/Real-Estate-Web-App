const express = require('express');
const router = express.Router();

router.get('/response', (req, res) => {
  res.status(200).json({
    message: "This feature will be available later."
  });
});

module.exports = { router };
