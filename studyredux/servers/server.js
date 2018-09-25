const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connect',function (socket) {
socket.on('sendmsg',function (data) {
    console.log(data)
    io.emit('recvmsg',data)
})

})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
server.listen('9093',function () {
    console.log("express is listening 9093")
})