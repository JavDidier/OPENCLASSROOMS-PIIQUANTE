// user routes
// importation de package origine nodeJS
const express = require('express');
const router = express.Router();

// importation fichier personnaliser
const userctrl = require('../controllers/user');

// création des routes
router.post('/signup', userctrl.signup);
router.post('/login', userctrl.login);

// exportation router
module.exports = router;
