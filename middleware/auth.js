// importation de jsonWebToken
const jwt = require("jsonwebtoken");

// Vérifier si l'utilisateur possède bien un token valide
module.exports = (req, res, next) => {
  try {
    const token         = req.headers.authorization.split(" ")[1];
    const decodedToken  = jwt.verify(token, process.env.KEY_SECRET);
    const userId        = decodedToken.userId;

    req.auth = { userId };

    // Vérifie sur req.body.userId est null, undefined, or false, et ensuite le compare à userId
    if (req.body.userId && req.body.userId !== userId) {
      throw "User invalide";
    } else { 
      next(); 
    }

  } catch (error) { res.status(401).json({ error: error - "Non identifier" });
  }
};
