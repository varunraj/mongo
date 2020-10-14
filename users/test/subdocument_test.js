const assert = require('assert');
const User = require('../src/user');


describe('Sub Documents', ()=>{

   it('can create a sub-document',async ()=>{

        const joe = new User({ 
              name: 'Joe', 
              posts: [{title:'PostTitle'}]
            });

        await joe.save()
        const user = await  User.findOne({name:'Joe'})
        assert(user.posts[0].title ==='PostTitle' )
        
    })


    it('can add sub-documents to an existing record', async()=>{
        const joe = new User({ 
            name: 'Joe', 
            posts: []
          });

        await joe.save();
        const user = await User.findOne({name:'Joe'})
        user.posts.push({title:'New Post'});
        await user.save();
        const updatedUser = await User.findOne({name:'Joe'})
        assert(updatedUser.posts[0].title ==='New Post' )
    })


    it('can remove an existing sub-document', async()=>{
        const joe = new User({ 
            name: 'Joe', 
            posts: [{title:'New Title'}]
          });

        await joe.save();
        const user = await User.findOne({name:'Joe'})
        user.posts[0].remove(); // remove the post 
        await user.save();
        const updatedUser = await User.findOne({name:'Joe'})
        assert(updatedUser.posts.length === 0 )


    })



})