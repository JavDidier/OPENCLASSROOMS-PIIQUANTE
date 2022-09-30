// sauces routes
// importation de package
const express       = require('express');
const router        = express.Router();
const multer        = require('../middleware/multer-config');

// importation fichier personnaliser
const auth          = require('../middleware/auth');
const saucesCtrl    = require('../controllers/sauce');

// création des routes
router.get('/',          auth, saucesCtrl.getAllSauces);
router.get('/:id',       auth, saucesCtrl.getOneSauce);
router.post('/',         auth, multer, saucesCtrl.createSauce);
router.put('/:id',       auth, multer, saucesCtrl.modifySauce);
router.delete('/:id',    auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

// exportation router
module.exports = router;
