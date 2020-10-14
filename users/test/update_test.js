const User = require ('../src/user');
const assert = require ('assert');
const { doesNotMatch } = require('assert');

describe('Updating Records', ()=>{

    let joe

    // beforeEach((done)=> {
    //     joe = new USer ({name: "Joe"})
    //     joe.save()
    //         .then(()=> done())
    // });


    beforeEach(async ()=> {
        joe = new User ({name: "Joe", likes:0})
        await joe.save();
            
    });


    function assertName(users){
        assert(users.length === 1)
        assert(users[0]._id.toString() === joe._id.toString())
    }



    it('instance type using set and save',async ()=>{
        
        joe.set('name','Alex') // this wont reflect to db
        await joe.save();
        const users = await User.find({name:"Alex"})
        assertName(users);
            
       

    });

    it(' A model instance can update', async ()=>{

        await joe.update({name:'Alex'})
        const users = await User.find({name:"Alex"})
        assertName(users);
        
    })

    // below ones are class based updates

    it('A model class can update',async ()=>{
        await User.update({name:"Joe"}, {name:"Alex"})
        const users = await User.find({name:"Alex"})
        assertName(users);

    })

    it('A model class can update one record', async()=>{
        await User.findOneAndUpdate({name:"Joe"}, {name:"Alex"})
        const users = await User.find({name:"Alex"})
        assertName(users);
    })

    it('A model class can find a record with id and update', async()=>{
        await User.findByIdAndUpdate(joe._id, {name:"Alex"})
        const users = await User.find({name:"Alex"})
        assertName(users);
    });


    // Mongo Update Operators - > use modifiers in conjuction with updates
    // send update instructions for mongo instead of getting data to application

    it('A user can have thier like count incremented by 1', async ()=>{

        await User.update({name:'Joe'},{ $inc: {likes:1}})
        const user = await User.findOne({name:'Joe'})
        assert(user.likes === 1);


    })
    

})