const router=express.Router()
import express from 'express'
import fs from 'fs'
import path from 'path'

router.get('/videos',(req,res)=>{
   const videopath=path.join(__dirname,'../uploads')
   fs.readdir(videopath,(err,files)=>{
    if(err){
        return res.status(500).json({error:'Failed to read videos'})
    }
    res.json(files)
   })
})
