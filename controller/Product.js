const Product = require("../models/Product")
const cloudinary = require("cloudinary")

async function uploadtoCloudinary(file,folder){
    const {options} = folder
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}


exports.createProduct = async(req,res)=>{
    try{
        
       const{name,price,description} = req.body;
       const response = req.files ? await uploadtoCloudinary(req.files.file,'Ecommerce') : null
       
       const data = await Product.create({
        name,price,description,
        imageUrl:response === null ? null : response.secure_url
    })
       return res.json({
        success:true,
        data:data,
        message:"entry created successfully"
       })
    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:"cannot create entry"  
        })
    }
}

exports.getALl = async(req,res)=>{
    try{
        const data = await Product.find({})
        return res.json({
            success:true,
            data:data
        })
    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:"cannot create entry"  
        })
    }
}