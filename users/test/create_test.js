//create a new user and save to db

const assert = require('assert');
const User = require('../src/user');


// describe and it are global variables inserted by mocha.

describe('Creating Records', ()=>{

    it('testing assertion',()=>{
        assert(1+1 === 2 );
    });

    it('saves a user',()=>{

        const joe = new User({name: 'Joe'}); // does not save to db
        joe.save();

    })



});