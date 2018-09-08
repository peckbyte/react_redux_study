import { createStore } from 'redux'

function counter(state=0, action) {
    switch (action.type) {
        case '加':
            return state+1
        case '减':
            return state-1
        default:
            return 10
    }
}

const store = createStore(counter)

console.log(store)

const init = store.getState()
console.log(init)


// 添加监听函数
function listener(){
    const currentData = store.getState()
    console.log(`现在的数值是${currentData}`)
}

store.subscribe(listener)

//执行action
store.dispatch({type:'减'})