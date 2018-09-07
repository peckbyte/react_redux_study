const express = require('express')
const mongoose = require('mongoose')

const app = express()
DB_URL = 'mongodb://127.0.0.1:27017/immoc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function () {
    console.log('mongodb is connecte')
})
//
const user = mongoose.model('user', new mongoose.Schema({
    user:{type:String, require: true},
    age:{type:Number, require: true},
}))
//
// user.create({
//     user: 'peckbyte',
//     age: 29,
// },function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })
//
// user.remove({user:'peckbyte'},function (err,doc) {
//         if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

user.update({user:'imooc'},{'$set':{age:200}}, function (e, d) {
    if (!e) {
        console.log(d)
    } else {
        console.log(e)
    }
})

app.get('/',(req,res) => {
    res.send('<div>hello world</div>>')
})

app.get('/data',(req,res)=> {
    // res.json({name:'peckbyte',job:'doctor'})
    user.find({} , function (err, doc) {
        if (!err) {
            res.json(doc)
        } else {
            res.json(err)
        }
    })
})



app.listen('8888',function () {
    console.log("express is listening 8888")
})