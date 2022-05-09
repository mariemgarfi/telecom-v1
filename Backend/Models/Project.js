const mongoose = require("mongoose");
   
const ProjectSchema=mongoose.Schema({

   
    NomProjet: {type : String},
    lieuProjet: {type : String},
    chefProjet: {type : String}, 
    emDateDebut:{type : String}, 
    quantitearticl:{type : String}, 
    etat: {type : String},
    });

    const Project= mongoose.model("project",ProjectSchema);
  module.exports =Project;