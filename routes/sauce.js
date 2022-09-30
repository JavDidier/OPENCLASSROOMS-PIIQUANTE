// sauces routes
// importation
const express       = require('express');
const multer        = require('../middleware/multer-config');
const auth          = require('../middleware/auth');
const saucesCtrl    = require('../controllers/sauce');
const router        = express.Router();

// création des routes
router.get('/',          auth, saucesCtrl.getAllSauces);
router.get('/:id',       auth, saucesCtrl.getOneSauce);
router.post('/',         auth, multer, saucesCtrl.createSauce);
router.put('/:id',       auth, multer, saucesCtrl.modifySauce);
router.delete('/:id',    auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

// exportation router
module.exports = router;
