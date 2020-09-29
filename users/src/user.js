const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
    name:String
}) 

const User = mongoose.model('user', userModel);

module.exports = User;
