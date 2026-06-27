const mongoose = require('mongoose');

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Database connected Successfully")
  }
  catch(error){
    console.error("Database Connection error:" , error );
    process.exit(1);
  }
}

module.exports = connectDB;