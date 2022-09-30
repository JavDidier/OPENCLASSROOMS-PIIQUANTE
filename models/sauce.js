// modele de schema sauce pour la base de donnees
const mongoose = require('mongoose');

// Strcture 
const sauceSchema = mongoose.Schema({
    userId:         { type: String, required: true },
    name:           { type: String, required: true },
    manufacturer:   { type: String, required: true },
    description:    { type: String, required: true },
    mainPepper:     { type: String, reuired: true },
    imageUrl:       { type: String, required: true },
    heat:           { type: Number, required: true },
    likes:          { type: Number, 'default': 0 },
    dislikes:       { type: Number, 'default': 0 },
    usersLiked:     { type: Array, 'default': [] },
    usersDisliked:  { type: Array, 'default': [] }
});

// exportation du model sauce dans la base de données
module.exports = mongoose.model('sauce', sauceSchema);