const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(keys.cosmodb.host+"?ssl=true&replicaSet=globaldb", {
    auth: {
      user: keys.cosmodb.user,
      password: keys.cosmodb.psk
    }
  })
  .then(() => {console.log('Connection to CosmosDB successful'); createDB(); })
  .catch((err) => console.error(err));

function createDB(){

    const baseConfig = {
    discriminatorKey: "_type", 
    collection: "users"   
    };

    const commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

    const User = commonModel.discriminator('userType', new mongoose.Schema({
        username: String,
        email: String
    }, baseConfig));

    const user = new User({
        username: "Oscar Martin",
        email: "oscar.martin@nextonia.com.co"
    });

    console.log(user);

    let collection = baseConfig.collection;

    user.save()
}
