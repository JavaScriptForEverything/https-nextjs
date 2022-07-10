const axios = require('axios')

axios.post('http://localhost:3000/api/users/logout', {})
.then(console.log)
.catch(err => console.log(err.message))
