// connexion à la base de données
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_CONNECT +"/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log(" - Connexion réussie à MongoDB "))
  .catch(error => console.log(" - Connexion échouée à MongoDB ", error));