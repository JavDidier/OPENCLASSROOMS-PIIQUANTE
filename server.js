// CONFIGS
require("dotenv").config({ path: "./configs/.env" }); //dotenv
require('./configs/db');        // base de données
require('./configs/image');     // gérer le dossier image

const express       = require('express');
const app           = express();
const path          = require('path');
const saucesRoutes  = require('./routes/sauce');
const userRoutes    = require('./routes/user');

// MORE SECURITY ( HELMET )
const helmet = require('helmet');
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// gestion des erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// analyser le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// écoute du serveur express sur le port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(' - Le serveur a démarré sur le port', process.env.PORT)
});

// exportation d'app
module.exports = app;
 