const mongoose = require("mongoose");
   require("dotenv").config();



   const connection = async () => {
      try {
     
         await mongoose.connect("mongodb://localhost:27017/fullstackapp");
         
      } catch (err) {
         console.error("Error connecting to MongoDB:", err);
      }
   }

   
module.exports= {connection};