const express = require("express");


const router = express.Router();

const Project= require("../Models/Project");
router.post("/ajouter_project", (req, res) => {
    console.log("heyyyytt req .body", req.body);
    const project = new Project({
        
        NomProjet:req.body. NomProjet,
    lieuProjet: req.body.lieuProjet,
    chefProjet: req.body. chefProjet,
    DateDebut:req.body.DateDebut,
    quantitearticl:req.body. quantitearticl,
    etat: req.body.etat,
        });
   project.save();
    res.status(200).json({
      message: "Project added succesful",
    });
  });
  router.get("/get_project", (req, res) => {
    Project.find((err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          data: docs,
        });
      }
    });
  });
  router.put("/Update_Project", (req, res) => {
    const project = {
      _id: req.body._id,
      
      NomProjet:req.body. NomProjet,
      lieuProjet: req.body.lieuProjet,
      chefProjet: req.body. chefProjet,
      DateDebut:req.body.DateDebut,
      quantitearticl:req.body. quantitearticl,
      etat: req.body.etat,
    };
   Project.updateOne({ _id: req.body._id },project).then(
      res.status(200).json({
        message: "Project updated successfuly",
      })
    );
  });
  router.get("/get_Project_byId/:id", (req, res) => {
    Project.findOne({ _id: req.params.id }).then((findedObject) => {
      if (findedObject) {
        res.status(200).json({
        project: findedObject,
        });
      }
    });
  });
  router.delete("/delete_Project/:id", (req, res) => {
    console.log("herreeeeeee id ", req.params.id);
   Project.deleteOne({ _id: req.params.id }).then(
      res.status(200).json({
        message: "Project deleted succesful",
      })
    );
  });
  module.exports = router;
