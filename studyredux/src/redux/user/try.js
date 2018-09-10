import axios from 'axios'




axios.get('/user/register')
.then(res => {
    console.log(res.data)
})