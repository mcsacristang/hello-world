const mongoose = require('mongoose');

const baseConfig = {
  discriminatorKey: "_type", 
  collection: "users"   
};

const commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

const User = commonModel.discriminator('userType', new mongoose.Schema({
  username: String,
  email: String,
  NXTN : String
}, baseConfig));

module.exports = User;