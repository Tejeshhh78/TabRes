const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ status: 'Users OK' });
});

// Beispiel: Liste aller User
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Max' }
  ]);
});

// Beispiel: Neuen User anlegen
router.post('/', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
});

module.exports = router;