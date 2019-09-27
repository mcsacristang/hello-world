const mongoose = require('mongoose');
const express = require('express');

require('./connection').connect;

function createUser(){

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

    const user = new User({
        username: "Oscar Martin",
        email: "oscar.martin@nextonia.com.co",
        NXTN: "Soporte"
    });

    console.log(user);

    user.save((err, saveUser) => {
      console.log("Saved: " + JSON.stringify(saveUser));
     });
}

function readUser(req, res){
  
  const userToFind = req;

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

  /*foundUser = User.find({ 'email' : userToFind}, function(err, foundFamily){
      foundFamily.forEach(fam => {console.log("Found Family (using discriminator): " + JSON.stringify(fam));
      return fam;
    });    
  });*/

    /*User.findOne({'email' : userToFind}).then(function(res){
      console.log(res);
      a = JSON.stringify(res);
      //return res;
      console.log('milo');
      console.log(a);
    });*/

    const a = User.findOne({'email' : userToFind});
    a.exec().then(as => b = JSON.stringify(as));
  
  console.log('milu');
  console.log(b);
}

module.exports = {
  createUser,
  readUser
}