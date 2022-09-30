// connexion à la base de données
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS +"@p6api.5yjcgal.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log(" - Connexion réussie à MongoDB "))
  .catch(error => console.log(" - Connexion échouée à MongoDB ", error));