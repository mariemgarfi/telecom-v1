const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  NomUtilisateur: { type: String },
  PrenomUtilisateur: { type: String },
  Email: { type: String ,unique: true},
  Poste: { type: String },
  Tel : { type: String },
  password : { type: String },
  magasin :{},
}, { strict: false });
UserSchema.plugin(uniqueValidator);

const User= mongoose.model("User", UserSchema);
module.exports = User;