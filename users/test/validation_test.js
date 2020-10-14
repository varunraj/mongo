const assert = require('assert');
const User = require('../src/user');

describe('Validating Records', ()=>{
    // we dont need to create a record to db. so no need
    // of beforeEach


    it('requires a user name',()=>{
        const user = new User({name:undefined})
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'name is required');
    })

    //message:'name must be longer than 2 chars'

    it('name greater than 2 chars',()=>{
        const user = new User({name:"A"})
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;
        assert(message === 'name must be longer than 2 chars');
    })

    it('disallow invalid record from save',async ()=>{
        const user = new User({name:'Al'})
        try {
            await user.save()
        } catch (validationResult){
                const message = validationResult.errors.name.message;
                assert(message === 'name must be longer than 2 chars');
                
            }
    })

})