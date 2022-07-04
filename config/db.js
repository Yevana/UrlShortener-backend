const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongouri');

const connectDB = async () =>{
try{
    await mongoose.connect(process.env.DATABASE,{
        useNewUrlParser:true,
      
      useUnifiedTopology: true,
    });
    console.log('database connected Successfully.....');
}catch (error){
    console.error(error.message);
    process.exit(1);
}
};

module.exports = connectDB;
