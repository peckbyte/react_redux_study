const map={
    run(){
        this.runState = true
    },
    stop(){
        this.runState = false
    }
}

class People {
    run(){
     console.log( 'hhaha')
    }
    stop(){

    }
}

console.log(People.prototype['run'])
console.log(map['run'])
console.log('下面开始赋值')
People.prototype['run']=map['run']
newpeople = new People
newpeople.run
console.log(newpeople.run)
console.log('赋值结束')


Object.keys(map).forEach(function (key) {
    console.log(key)
})

