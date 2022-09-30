const Sauce = require("../models/sauce");
const fs    = require("fs");

/* 
  > Récupérer toutes les sauces
  > /sauces : GET
  Request Body -- > -
  Response     -- > { Array of sauces }
*/
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
};

/*
  > Récupérer une seule sauce méthode findOne()
  > /sauces/:idSauce : GET
  Request Body -- > -
  Response     -- > { Single sauce }
*/
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
};

/*
  > Créer une sauce
  > /sauces : POST
  Request Body -- > { sauce: String, image: File }
  Response     -- > { message: String, Verb }
  Utilise multer
*/
exports.createSauce = (req, res, next) => {
  const sauceAdd = JSON.parse(req.body.sauce); // Transforme la requête string, en objet sauceAdd
  const newSauce = new Sauce({ ...sauceAdd, imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`

  // informations sur imageURL (url dynamique) :
    //  req.protocol : http, https
    //  req.get : récupère le nom d'hôte
    //  req.file.filename : récupère le nom du fichier
  });

  newSauce.save()
    .then(() => res.status(201).json({ message: "Nouvelle sauce créée !" }))
    .catch(error => res.status(400).json({ error }))
};


/*
  > Modifier une sauce :
  > /sauces/:idSauce : PUT
  Request Body -- > Sauce as JSON or { sauce: String, image: File }
  Response     -- > { message : String }
  Utilise multer
*/
exports.modifySauce = (req, res, next) => {
  const sauceModify = req.file 
    ? { ...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceModify, _id: req.params.id }
  )
    .then(() => res.status(201).json({ message: "La sauce a été mise à jour" }))
    .catch(error => res.status(400).json({ error }))
};


/* 
  > Supprimer une sauce
  > /sauces/idSauce : DELETE
  -- > -
  -- > { message: String }
*/
exports.deleteSauce = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        //quant fichier supprimé, on supprime l'ojet de la base de données
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "La sauce à été supprimée !" }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


/* 
  > Liker ou Disliker une sauce
  > /sauces/idSauce/like : POST
  -- > { userIid : String, like: Number }
  -- > { message: String }
*/
exports.likeSauce = (req, res, next) => {
 
  const sauceId     = req.params.id;
  const userId      = req.body.userId;
  const likeStatus  = req.body.like;

  // Ajouter like ou Dislike
  switch (likeStatus) {
    // Ajouter Like
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        {
          $inc: { likes: +1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "Un like ajouté !" }))
        .catch(error => res.status(400).json({ error }));
      break;

    // Ajouter Dislike
    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        {
          $inc: { dislikes: +1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "Un dislike ajouté ! " }))
        .catch(error => res.status(400).json({ error }));
      break;

    // Supprimer Like ou Dislike
    case 0:
      Sauce.findOne({ _id: sauceId })
      // Supprimer un like
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: userId },
              }
            )
              .then(() => res.status(201).json({ message: "Suppression du like !" }))
              .catch(error => res.status(400).json({ error }));

      // Supprimer un dislike
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: userId },
              }
            )
              .then(() => res.status(201).json({ message: "Suppression du dislike ! " }))
              .catch(error => res.status(400).json({ error }));

      // Gestion des erreurs
          } else {
            res.status(403).json({ message: "Mauvaise requête !" });
          }
        })
        .catch(() => res.status(404).json({ message: "Impossible de récupérer la sauce !" }));
      break;
  }
};
