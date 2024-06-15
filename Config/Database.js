const mongoose=require("mongoose")

const Connectdb=async(req,res)=>{
    try{
        const data=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb Connected ${data.connection.host}`);
    }catch(error){
        console.log(`Error to connect Mongodb ${error}`);
    }
}

module.exports=Connectdb