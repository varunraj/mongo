// all testing setup is done in this file. 
//When mocha scans for test files, it will execute all files in the parent folder. That is how this code is executed.

const mongoose = require('mongoose');

// execute only once. Once connected, call done.
before((done)=> {
// two options passed to mongoose connect is to not show the depreciation warning.
mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
        .once('open', ()=>{ 
            console.log('Good to go');
            done()
        })
        .on('error', (error)=> {
            console.warn('Warning', error)
        });


})


// below function will run before each test run (describe block)


// afterEach describe block run below code accepts a function that accepts a cb. 
afterEach((done)=>{
    // drop accepts a call back function once asyc part is done.
    mongoose.connection.collections.users.drop(()=>{
        // run tests now.
        done();
    });
})