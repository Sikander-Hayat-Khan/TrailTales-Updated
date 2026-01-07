import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { USER_CONFIG } from "../config/constants.js"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true,"No name provided"],
        trim : true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "No email provided"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password:{
        type: String,
        required: [true,"No password provided"],
        minlength: USER_CONFIG.MIN_PASSWORD_LENGTH
    },
    bio: {
        type: String,
        default: "I travel to avoid people… and sometimes find more.",
        maxlength: USER_CONFIG.MAX_BIO_LENGTH
    },
    avatarColor: {
        type: String,
        default: "#f28b50",
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
UserSchema.pre("save",async function(){
    if (!this.isModified('password')) return;
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})
UserSchema.methods.createJWT = function(){
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({userID:this._id,username: this.username},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export default mongoose.model("User",UserSchema)