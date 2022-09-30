// modele de schema user pour la base de donnees
const mongoose          = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');

// Structure 
const userSchema = mongoose.Schema({
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true }
});

// application du plugin mongoose-unique-validator avant de l'exporter
userSchema.plugin(uniqueValidator);

// exportation du model user dans la base de données
module.exports = mongoose.model('user', userSchema);