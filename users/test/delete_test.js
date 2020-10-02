const { AssertionError } = require('assert');
const assert = require('assert');
const User = require('../src/user');

describe('Deleting User', ()=>{


    let tom;

    beforeEach((done)=>{
       tom = new User ({name:"Tom"});
       tom.save()
           .then(()=>done());
    
    });

    it('model instance remove', (done) => {
        tom.remove()
        .then(()=> User.findOne({ name: "Tom"}))
        .then((user)=> {
            assert(user === null)
            done();
        })
        
    });


    // Using User class
    it('class method remove',(done )=>{
        User.remove({name:"Tom"})
        .then(()=> User.findOne({ name: "Tom"}))
        .then((user)=> {
            assert(user === null)
            done();
        })


    });

    // Using User class
    it('class method findOneAndRemove', (done)=>{

        User.findOneAndRemove({name:"Tom"})
        .then(()=> User.findOne({ name: "Tom"}))
        .then((user)=> {
            assert(user === null)
            done();
        })


    })

    // Using User class
    it('class method findByIdAndRemove', (done)=>{
        User.findByIdAndRemove(tom._id)
        .then(()=> User.findOne({ name: "Tom"}))
        .then((user)=> {
            assert(user === null)
            done();
        })
    })


});
