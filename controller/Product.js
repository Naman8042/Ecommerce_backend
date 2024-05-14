const Product = require("../models/Product")

exports.createProduct = async(req,res)=>{
    try{
       const{name,price,description} = req.body;
       const data = await Product.create({name,price,description})
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