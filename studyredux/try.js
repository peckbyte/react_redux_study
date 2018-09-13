let a={x:1,y:2,c:3,d:4}
let b={c:4,e:5,f:6}
let bb={a:11,b:22,c:33,d:44}

let c={...a,...b}

let {x,y,...o} = a
console.log(c)
console.log(o)