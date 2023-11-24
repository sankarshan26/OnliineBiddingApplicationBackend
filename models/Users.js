const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required : true,
    },
    username : {
        type: String,
        required : true,
        unique: true ,
    },
    password : {
        type : String, 
        required: true,
    },
    address : {
        type: String,
        required : true,
    },
    zipcode : {
        type: String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true ,
    },
    wallet : {
        type : String,
        required : true,
    }
});

const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel ;