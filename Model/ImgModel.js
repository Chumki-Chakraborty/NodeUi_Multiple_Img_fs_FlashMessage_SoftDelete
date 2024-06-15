const mongoose=require("mongoose")

const schema=mongoose.Schema

const ImageSchema=new schema({
    title:{
        type:String,
        required:true
    },
    Image:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:1
    },
})

const ImgModel=mongoose.model("Data",ImageSchema)
module.exports=ImgModel