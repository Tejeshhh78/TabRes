const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ status: 'Status OK' });
});

module.exports = router;
