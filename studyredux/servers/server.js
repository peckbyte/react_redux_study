const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connect',function (socket) {
socket.on('sendmsg',function (data) {
    const {from, to, msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},(err,doc)=>{
        io.emit('recvmsg',Object.assign({},doc._doc))
    })
    // console.log(data)
    // io.emit('recvmsg',data)
})

})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
server.listen('9093',function () {
    console.log("express is listening 9093")
})