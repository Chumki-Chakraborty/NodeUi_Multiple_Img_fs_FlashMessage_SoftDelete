const ImageModel=require("../Model/ImgModel")
const flash = require('connect-flash');
const path=require("path")
const fs=require("fs")

class ImageController{
    HomePage=async(req,res)=>{
        try{
            const AllData=await ImageModel.find()
            if(AllData){
                res.render("Home",{
                    title:"Home Page",
                    message1:req.flash("message"),
                    message2:req.flash("message"),
                    message3:req.flash("message"),
                    getData:AllData
                })
            }
        }catch(error){
            console.log(`error to get all data..`);
        }
        
    }
    AddDataPage=(req,res)=>{
        res.render("AddData",{
            title:"AddData Page"
        })
    }
    AddData=async(req,res)=>{
        try{
            const{title}=req.body
            const newimg=req.files.map((file)=>file.path)
            const DataAdd=new ImageModel({
                title,Image:newimg
            })
           
            const savedata=await DataAdd.save()
            if(savedata){
               
                console.log(`Data Added successfully`,savedata);
                req.flash("message","Data Added successfully")
                res.redirect("/")
            }
        }catch(error){
            res.redirect("/add/data/page")
            console.log(`Error to Add Data`);
        }
    }
    // --------------------EditData---------------//
    EditPage=async(req,res)=>{
        try{
            const id=req.params.id
            const EditData=await ImageModel.findById(id)
            if(EditData){
                res.render("EditPage",{
                    title:"edit page",
                    edit:EditData,
                    message2:req.flash("message"),
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    // ----------------UpdatePage--------------//
    UpdatePage=async(req,res)=>{
        try{
            const id=req.params.id
            const{title}=req.body
            const DuplicateImg=await ImageModel.findById(id)
            const newimg=req.files.map((file)=>file.path)
            if(DuplicateImg){
                DuplicateImg.Image.forEach((img)=>{
                    fs.unlinkSync(img)
                })
            }
           
            const updatedata=await ImageModel.findByIdAndUpdate(id,{
                title,Image:newimg
            },{new:true})
            if(updatedata){
                console.log(`Data has been updated`,updatedata);
                req.flash("message","Data has been updated")
                res.redirect("/")
            }
        }catch(error){

        }
    }
    // -----------------DeleteData--------------//
    DeleteData=async(req,res)=>{
        try{
            const id=req.params.id
            const deletdata=await ImageModel.findByIdAndUpdate(id,{status:0})
            deletdata.Image.forEach((Img)=>{
                fs.unlinkSync(Img)
            })
            if(deletdata){
                console.log(`Data has been Deleted`,deletdata);
                req.flash("message","Data has been Deleted")
                res.redirect("/")
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=new ImageController()