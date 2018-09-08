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