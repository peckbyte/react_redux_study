const express = require('express')
const Router = express.Router()

Router.get('/register',(req,res)=>{
   return res.json({code:1})
})

Router.post('/register',(req,res)=>{
   return res.json({code:1})
})

module.exports = Router