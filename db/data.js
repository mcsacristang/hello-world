const User_common = require('./model');

const user_common = new User_common({
    username: "Oscar Martin",
    email: "oscar.martin@nextonia.com.co"
});

user_common.save((err, saveUser) => {
    console.log("Saved: " + JSON.stringify(saveUser));
});