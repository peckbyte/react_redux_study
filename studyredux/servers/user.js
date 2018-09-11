const express = require('express')
const Router = express.Router()
const model =require('./model')
const User = model.getModel('user')


Router.get('/list',(req,res) => {
   User.find({}, function (err,doc) {
       return res.json(doc)
   })
})


Router.get('/register',(req,res)=>{
   return res.json({code:1})
})

Router.post('/register',function(req,res){
    console.log("haha")
    console.log(req.header)
   const {user,psw,role} = req.body
   // const {user,psw,role} = {user:'peck',psw:'123',role:'boss'}
    User.findOne({user},(e,d) => {
        if (d) {
            return res.json({code:1, msg:'用户名重复'})
        }
        User.create({user, psw, role},function (e, d) {
            if (e) {
                return res.json({code:1,msg:'服务端出错'})
            }
            return res.json({code:0})
        })
    })
})

module.exports = Router