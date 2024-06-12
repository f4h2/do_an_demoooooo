const mongoose=require("mongoose")

const newSchema=new mongoose.Schema({
    x1:{
        type:Number,
        required:true
    },
    y1:{
        type:Number,
        required:true
    },


    x2:{
        type:Number,
        required:true
    },
    y2:{
        type:Number,
        required:true
    },

    x3:{
        type:Number,
        required:true
    },
    y3:{
        type:Number,
        required:true
    },

});

const collection = mongoose.model("collection",newSchema)

module.exports=collection