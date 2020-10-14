const assert = require('assert');
const User = require('../src/user')

describe('Virtual types', ()=>{

    it('postCount returns number of posts',async()=>{

        const joe = new User({
                        name:"Joe", 
                        posts:[{title:"PostTitle"}]
                    });

        await joe.save()
        const user = await User.findOne({name:"Joe"})
        //postCount is a virtual field derived from # of posts.
        assert(user.postCount ===1 )

    })



})