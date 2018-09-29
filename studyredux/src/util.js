export function redirectTo({role,avatar}) {
    let url = (role==='boss')?'/boss':'/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}

export function getChatid(from_id,to_id) {

    return [from_id, to_id].sort().join('_')
}