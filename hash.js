const bcrypt = require('bcrypt');

//  Salting
//  String that is added before or after the password
//  1234 -> abcd

async function run(){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();