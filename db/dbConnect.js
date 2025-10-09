const mongoose = require("mongoose");

require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialiseDatabase = async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("Connected to Database");
    }).catch((error)=>{
        console.log("Couldn't connect to the Database", error);        
    });
};

module.exports = { initialiseDatabase }