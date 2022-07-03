const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    longurl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    shortUrlCode:{
        type:String,
    },
    visit:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model("urlshort",UrlSchema)