import mongoose from "mongoose";

const jobSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[3,"Job title must be at least 3 character"],
        maxLength:[50,"Job title cannot exceed 50 character"],
    },
    description :{
        type:String,
        required :[true,"Please provide a job description"],
        minLength :[3,"Job description must be at least 50 characters"],
        maxLength :[500,"Job description cannot exceed 500 characters"],

    },
    category:{
        type:String,
        required:[true,"Job category is required"],

    },
    country:{
           type :String,
           required:[true,"Country in required"],
    },
    city :{
         type:String,
         required :[true,"Job city is required"]
    },
    location:{
        type:String,
        required:[true,"Please provide exact location"],
        minLength:[50,"Job location must contain at least 50 characters"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed Salary must not be below 1000"],
        maxLength:[9,"Fixed Salary must not be crossing 9 figures"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must not be below 1000"],
        maxLength:[9,"Salary from must not be crossing 9 figures"],
    },
    salaryTo:{
       type:Number,
        minLength:[4,"Salary to must not be below 1000"],
        maxLength:[9,"Salary to must not be crossing 9 figures"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },


});

export const Job =mongoose.model("Job",jobSchema);