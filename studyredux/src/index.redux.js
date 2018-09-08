const ADD = '加'
const REMOVE = '减'

export function counter(state=0, action) {
    switch (action.type) {
        case ADD:
            return state+1
        case REMOVE:
            return state-1
        default:
            return 10
    }
}

export function addDATA() {
    return {type:ADD}

}

export function removeDATA() {
    return {type:REMOVE}
}
 