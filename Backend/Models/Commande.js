const mongoose = require("mongoose");
   
const CommandeSchema=mongoose.Schema({
     
     
     nomarticle:{type : String},
     codearticle: {type : String},
     categorie:{type : String},
     quantitearticl: {type : String},
     categorie_article: {type : String},
     idFournisseur:{ type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur' },
     datecommande: {type : String},
     etat: {type : String},
     magasin: {type : String}
     
    });

    const Commande= mongoose.model("Commande",CommandeSchema);
  module.exports =Commande;