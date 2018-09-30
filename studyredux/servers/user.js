const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'psw': 0, '__v': 0}


Router.get('/list', (req, res) => {
    const {role} = req.query
    User.find({role}, function (err, doc) {
        return res.json({code: 0, data: doc})
    })
})


//清除用户数据库
Router.get('/remove', (req, res) => {
    User.remove({}, function (e, d) {

    })
})
//获取消息列表
Router.get('/getmsglist', (req, res) => {
    const {userid} = req.cookies
    User.find({}, (err, doc) => {
        let users = {}
        doc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })

        Chat.find({'$or':[{from:userid},{to:userid}]}, function (err, doc) {
            if (!err) {
                return res.json({msgs: doc, code: 0, users:users})
            }
            return res.json({code: 1})

        })
    })

})

// Router.get('/register', (req, res) => {
//     return res.json({code: 1})
// })
//获取信息
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
//注册
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
//更新user信息
Router.post('/update', function (req, res) {
    // console.log(req.body)
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code: 1})
    }

    const body = req.body
    console.log(body)

    User.findByIdAndUpdate(userid, body, {new: true}, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            role: doc.role
        }, body)
        return res.json({code: 0, data})
    })

})
// 登录
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

Router.post('/readmsg',function (req,res) {
    const userid = req.cookies.userid
    const from=req.body.from
    Chat.update({from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function (err,doc) {
        if (!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})

    })

})

//密码加密
function toMd5(psw) {
    const salt = 'peckbyt_is_trying_to_becoming_engineer&*234##'
    return utils.md5(utils.md5(psw + salt))
}

module.exports = Router