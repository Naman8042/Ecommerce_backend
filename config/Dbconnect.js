
const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        
        
    })
    .then(()=>console.log("db connected successfully"))
    .catch((error)=>{
        console.log("issue in db connection")
        console.log(error);
        process.exit(1);
    })
}
module.exports = dbconnect;