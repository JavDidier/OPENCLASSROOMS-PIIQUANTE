// ---- Pour gérer la création du dossier images si il n'existe pas
const fs            = require('fs'); // permet d'intéragir avec le système de fichier
const pathImages    = './images';   // chemin où le dossier image sera créé
// ----

//  Vérifie si un dossier images déjà , sinon on le créé
fs.access(pathImages, (error) => {
   
    if (error) {
      // Si erreur alors l'utilisateur n'a pas accès au dossier images, celà signifie qu'il existe pas.
      // Alors nous créons le dossier images
      fs.mkdir(pathImages, (error) => {
        if (error) console.log(error);
        else console.log("Le dossier images à été créer avec succès");
      });
    }
  });
