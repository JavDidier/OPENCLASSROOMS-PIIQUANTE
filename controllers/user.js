const User        = require("../models/user");
const bcrypt      = require("bcrypt");
const jwt         = require("jsonwebtoken");
const saltRounds  = 10;

// Signup user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((mdpHash) => {
      const user = new User({
        email: req.body.email,
        password: mdpHash,
      });
      user
        .save()
        .then(() =>res.status(201).json({ message: "L'utilisateur a été créé avec succès !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Login user
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })

    .then((user) => {
      if (user === null) {
        res.status(401).json({ error: "Identification invalide" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ error: "Identification invalide" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.KEY_SECRET, {
                  expiresIn: "12h",
                }),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};
