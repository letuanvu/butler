const userSchema = require('../models/userSchema');
const Http = require('../Http');
const md5 = require('md5');

const seed = async () => {
  try {
    Http.connectMongo(); 

    const admin = new userSchema();
    admin.email = 'letuanvu';
    admin.password = md5('123456');
    console.log(await admin.save());

  } catch (connectError) {
    console.error(connectError);
  }
}

seed();
