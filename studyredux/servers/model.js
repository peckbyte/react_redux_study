const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'

mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{type:String,'require':true},
        'psw':{type:String,'require':true},
        'role':{type:String,'require':true},
        'avatar':{type:String},
        'desc':{type:String},
        'company':{type:String},
        'salary':{type:String},
        'need':{type:String},
        },
    chat:{}

}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports =  {
    getModel: function (name) {
        return mongoose.model(name)
    }
}