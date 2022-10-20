// importation de multer pour gérer les images
const multer = require('multer');


// ============================================= MODIFIER AVANT LE PASSAGE DE LA SOUTENANCE
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// ============================================= MODIFIER AVANT LE PASSAGE DE LA SOUTENANCE

// précise la destination de l'enregistrement
const storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');