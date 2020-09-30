//create a new user and save to db

const assert = require('assert');
const User = require('../src/user');


// describe and it are global variables inserted by mocha.

describe('Creating Records', ()=>{

    it('testing assertion',()=>{
        assert(1+1 === 2 );
    });

    it('saves a user',(done)=>{

        const joe = new User({name: 'Joe'}); // does not save to db
        joe.save()
            .then(()=>{
                //isNew property on model will be true if not saved to db
                assert(joe.isNew === false)
                done();
            })

    });



});