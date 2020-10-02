//create a new user and save to db

const assert = require('assert');
const User = require('../src/user');


// describe and it are global variables inserted by mocha.

describe('Creating Records', ()=>{

    it('testing assertion',()=>{
        assert(1+1 === 2 );
    });

    it('saves a user',(done)=>{

        const rob = new User({name: 'Rob'}); // does not save to db
        rob.save()
            .then(()=>{
                //isNew property on model will be true if not saved to db
                assert(rob.isNew === false)
                done();
            })

    });



});