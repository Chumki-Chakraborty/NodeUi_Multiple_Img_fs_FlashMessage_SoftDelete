const express=require("express")
const WebController = require("../Controller/WebController")
const uploadimg=require("../Utilits/ImageUpload")
const ImageRouter=express.Router()

ImageRouter.get("/",WebController.HomePage)
ImageRouter.get("/add/data/page",WebController.AddDataPage)
ImageRouter.post("/post/data",uploadimg.array("Image",2),WebController.AddData)
ImageRouter.get("/edit/page/:id",WebController.EditPage)
ImageRouter.post("/update/data/:id",uploadimg.array("Image",2),WebController.UpdatePage)
ImageRouter.get("/delete/data/:id",WebController.DeleteData)



module.exports=ImageRouter