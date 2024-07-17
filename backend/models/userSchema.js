import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        minLength :[3,"Name must contain at least 3 character"],
        maxLength :[30,"Name must contain at most 30 cahracters"],
    },
    email :{
        type :String,
        required :[true,"Please provide a email"],
        validate :[validator.isEmail,"Please provide a valid email"],
    },
    phone :{
        type :Number,
        required :[true,"Please provide you phone number."]
    },
    password:{
        type :String,
        required :[true,"Please provide you password"],
        minLength :[8,"Passwrod must contain at least 8 character"],
        maxLength :[32,"Password must contain at most 32 character"],
        select:false,
    },
    role:{
        type:String,
        required :[true,"Please provide you role"],
        enum:["Job Seeker","Employer"],
    },
    createdAt :{
        type: Date,
        default :Date.now,
    },
});

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//Generating A jwt token for authorization

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn:process.env.JWT_EXPIRE,
    });
  };

export const User =mongoose.model("User",userSchema);