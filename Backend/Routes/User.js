const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

router.post("/ajouter_Utilisateur", (req, res) => {
  console.log("heyyyytt req .body", req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      NomUtilisateur: req.body.NomUtilisateur,
      PrenomUtilisateur: req.body.PrenomUtilisateur,
      Email: req.body.Email,
      Poste: req.body.Poste,
      Tel: req.body.Tel,
      password: hash,
      magasin: req.body.magasin,
    });

    user.save(function (err) {
      if (err) {
        res.status(200).json({
          message: "error",
        });
      } else {
        res.status(200).json({
          message: "user added succesful",
        });
      }
    });
  });
});

router.post("/add_super_admin", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      NomUtilisateur: req.body.NomUtilisateur,
      PrenomUtilisateur: req.body.PrenomUtilisateur,
      Email: req.body.Email,
      Poste: req.body.Poste,
      password: hash,
    });

    user.save();
    res.status(200).json({
      message: "user added succesful",
    });
  });
});

router.put("/Update_Utilisateur", (req, res) => {
  const user = {
    _id: req.body._id,
    NomUtilisateur: req.body.NomUtilisateur,
    PrenomUtilisateur: req.body.PrenomUtilisateur,
    Email: req.body.Email,
    Poste: req.body.Poste,
    Tel: req.body.Tel,
    password: req.body.password,
    magasin: req.body.magasin,
  };
  User.updateOne({ _id: req.body._id }, user).then(
    res.status(200).json({
      message: "user updated successfuly",
    })
  );
});

router.get("/get_user", (req, res) => {
  User.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});

router.get("/get_user_byId/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        user: findedObject,
      });
    }
  });
});

router.delete("/delete_User/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  User.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "user deleted succesful",
    })
  );
});
router.post("/login", (req, res) => {
  User.findOne({ Email: req.body.email })
    .then((findedUser) => {
      if (!findedUser) {
        res.status(200).json({
          message: "0",
        });
      }
      return bcrypt.compare(req.body.password, findedUser.password);
    })
    .then((correctUserPwd) => {
      if (!correctUserPwd) {
        console.log("correctUserPwd", correctUserPwd);

        res.status(200).json({
          message: "1",
        });
      }
      User.findOne({ Email: req.body.email }).then((finalUser) => {
        let user = {
          id: finalUser._id,
          NomUtilisateur: finalUser.NomUtilisateur,
          PrenomUtilisateur: finalUser.PrenomUtilisateur,
          Poste: finalUser.Poste,
          magasin: finalUser.magasin,
        };
        res.status(200).json({
          user: user,
          message: "2",
        });
      });
    });
});

module.exports = router;
