// all testing setup is done in this file. 
//When mocha scans for test files, it will execute all files in the parent folder. That is how this code is executed.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
        .once('open', ()=>{ console.log('Good to go')})
        .on('error', (error)=> {
            console.warn('Warning', error)
        });