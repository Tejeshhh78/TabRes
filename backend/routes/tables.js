const express = require('express');
const {
    getTables
} = require('../controllers/tableController')

const router = express.Router();

// Öffentliche Routen
router.get('/', getTables);

module.exports = router;