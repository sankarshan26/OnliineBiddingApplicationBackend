const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    id : {
       unqiue : true ,
       type : Number ,
       required : true, 
    },
    name :{
        type : String,
        required : true ,
    },
    rating : {
        type : String ,
        required : true,
    },
    endDate : {
        type : Date,
        required : true,
    },
    baseprice : {
        type : Number ,
        required : true,
    },
    currPrice : {
        type : Number,
        required : true,
    },
    Topbidder : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    images : {
        type : Array ,
        required : true,
    },
    TrendingDeal : {
        type : Boolean ,
        required : true,
    },
    TopDeal : {
        type : Boolean ,
        required : true,
    },
    description : {
        type : String,
        required : true ,
    },
});

const ItemModel = mongoose.model("items",ItemSchema);
module.exports = ItemModel ;