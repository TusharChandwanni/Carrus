import mongoose from "mongoose";
import app from "../app.js";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName :"MERN_JOB_SEEKING_APPLICATION",
    }).then(() => {
        
         console.log ("Connected to database");
         
}
).catch((err) => console.log(`Some error has occurred : ${err}`))
};

