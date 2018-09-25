const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'psw': 0, '__v': 0}

Router.get('/list', (req, res) => {
    const { role } = req.query
    User.find({ role }, function (err, doc) {
        return res.json({code:0,data:doc})
    })
})

Router.get('/try', (req, res) => {
    const userid = '5b9a6d988468b113df74fdbe'
    User.findByIdAndUpdate(userid,{avatar:'工作',company:'公司',salary:'1k',need:'吃苦耐劳'},{new:true},(e,d) =>{
        return res.json(d)
    })
})

Router.get('/remove', (req, res) => {
    User.remove({},function (e,d) {

    })
})

Router.get('/getmsglist',(req,res)=>{
    const {userid} = req.cookies
    Chat.find({},function (err,doc) {
        if (!err){
            return res.json({msgs:doc,code:0})
        }
        return res.json({code:1})

    })
})

Router.get('/register', (req, res) => {
    return res.json({code: 1})
})

Router.get('/info', (req, res) => {
    const {userid} = req.cookies
    console.log(req.cookies)
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({'_id': userid}, _filter, (e, d) => {
        if (e) {
            return res.json({code: 1, msg: '后端错误'})
        }
        return res.json({code: 0, data: d})
    })
})

Router.post('/register', function (req, res) {
    // console.log(req.body)
    const {user, role, psw} = req.body
    // const {user,psw,role} = {user:'peck',psw:'123',role:'boss'}
    User.findOne({user}, _filter, (e, d) => {
        if (d) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, role, psw: toMd5(psw)})
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '服务端出错'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })

    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code: 1})
    }

    const body = req.body
    console.log(body)

    User.findByIdAndUpdate(userid,body,{new:true},function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            role:doc.role
        },body)
        return res.json({code:0,data})
    })

})

Router.post('/login', function (req, res) {
    const {user, role, psw} = req.body
    User.findOne({user, psw: toMd5(psw)}, _filter, (e, d) => {
        if (!d) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', d._id)
        return res.json({code: 0, data: d})
    })
})

function toMd5(psw) {
    const salt = 'peckbyt_is_trying_to_becoming_engineer&*234##'
    return utils.md5(utils.md5(psw + salt))
}

module.exports = Router