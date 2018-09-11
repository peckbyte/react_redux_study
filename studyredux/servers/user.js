const express = require('express')
const Router = express.Router()
const model =require('./model')
const user = model.getModel('user')


Router.get('/list',(req,res) => {
   user.find({}, function (err,doc) {
       return res.json(doc)
   })
})

Router.get('/register',(req,res)=>{
   return res.json({code:1})
})

Router.post('/register',(req,res)=>{
   return res.json({code:1})
})

module.exports = Router