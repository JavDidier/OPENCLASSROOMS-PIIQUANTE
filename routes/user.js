// user routes
// importation
const express   = require('express');
const userCtrl  = require('../controllers/user');
const router    = express.Router();

// création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// exportation router
module.exports = router;
