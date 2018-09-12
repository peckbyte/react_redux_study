const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {'psw': 0, '__v': 0}

Router.get('/list', (req, res) => {
    User.find({}, function (err, doc) {
        return res.json(doc)
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
            return res.json({code:0,data:{user, type, _id}})
        })

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