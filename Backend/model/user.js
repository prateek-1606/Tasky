const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    title: {
        type: "String",
        required: true
    },
    avatar: {
        type: "String",
        required: true
    },
    usertype: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    }
})

module.exports = model('user', userSchema);