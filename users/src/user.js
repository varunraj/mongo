const mongoose = require('mongoose');
const PostSchema = require('./post')

const Schema = mongoose.Schema;

const userModel = new Schema({
    name: {
        type:String,
        validate: {
            validator:(name)=> name.length > 2 ,
            message:'name must be longer than 2 chars'
        },
        required: [true, 'name is required']  
    },
    postCount:Number,
    posts:[PostSchema]
}) 

const User = mongoose.model('user', userModel);

module.exports = User;

