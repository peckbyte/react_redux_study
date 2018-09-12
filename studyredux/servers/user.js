const express = require('express')
const Router = express.Router()
const utils = require('utility')
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
    // console.log(req.body)
   const {user,role,psw} = req.body
   // const {user,psw,role} = {user:'peck',psw:'123',role:'boss'}
    User.findOne({user},(e,d) => {
        if (d) {
            return res.json({code:1, msg:'用户名重复'})
        }
        User.create({user, role, psw:toMd5(psw)},function (e, d) {
            if (e) {
                return res.json({code:1,msg:'服务端出错'})
            }
            return res.json({code:0})
        })
    })
})

Router.post('/login',function(req,res){
    // console.log(req.body)
    const {user,role,psw} = req.body
    // const {user,psw,role} = {user:'peck',psw:'123',role:'boss'}
    User.findOne({user,psw:toMd5(psw)},{psw:0},(e,d) => {
        if (!d) {
            return res.json({code:1, msg:'用户名或密码错误'})
        }
        return res.json({code:0,data:d})
    })
})

function toMd5(psw){
    const salt = 'peckbyt_is_trying_to_becoming_engineer&*234##'
    return utils.md5(utils.md5(psw+salt))
}

module.exports = Router