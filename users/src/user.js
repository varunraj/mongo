const mongoose = require('mongoose');
const PostSchema = require('./post')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        validate: {
            validator:(name)=> name.length > 2 ,
            message:'name must be longer than 2 chars'
        },
        required: [true, 'name is required']  
    },
    likes:Number,
    posts:[PostSchema]
}) 

// add a virual field ;postCount is not a field in db rather it is a
// computer field on the fly.
// We need to pass a function with funciton keyword instead of fat arrow here
// if we use fat arrow, this keyword will bind to the file and not the instance of collection.
userSchema.virtual('postCount').get( function(){
   return this.posts.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;

