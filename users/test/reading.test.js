const { doesNotMatch } = require('assert');
const assert = require('assert')
const User = require('../src/user');


describe('Reading users from database',()=>{

    // create a record before searching it.
    // create joe outside beforeEach so that it is available inside it block
    let joe;

    beforeEach((done)=> {
        joe = new User({name:"Joe"});
        joe.save()
            .then(()=>done());
    })
    

    it('find all users with a name of joe',(done)=>{
       
       // find will return several. findOne return first match
        User.find({name:"Joe"})
            .then((users)=>{
                // users will be an array
                // since _id is of type object, we need to call toString
                // joe will already have primary key even before saving in db.
                assert(users[0]._id.toString() === joe._id.toString())
                done();
            })
    })

    
    it('find a user with specific id',(done)=>{
        User.findOne({ _id:joe._id })
            .then((user)=> {
                assert (user.name === "Joe");
                done()
            })
    } )



});