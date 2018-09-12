export function redirectTo({role,avatar}) {
    let url = (role==='boss')?'/boss':'/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}