//Connect Database / Operate DB
const { json } = require("express")
const slugify = require("slugify")
const Blogs = require("../models/blogs")

//Create Blog Data
exports.create=(req,res)=>{
    const {title,content,author} = req.body
    const slug = slugify(title)

    //Validate Data
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;
    }
    //Save data
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีบทความชื่อซ้ำกัน"})
        }
        res.json(blog)
    })
}