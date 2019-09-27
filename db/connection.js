const mongoose = require('mongoose');

const keys = require('../config/keys');

function connect(){
    return mongoose.connect(keys.cosmodb.host+"?ssl=true&replicaSet=globaldb", {
        auth: {
        user: keys.cosmodb.user,
        password: keys.cosmodb.psk
        }
    })
    .then(() => {console.log('Connection to CosmosDB successful');})
    .catch((err) => console.error(err));
}

module.exports = connect;