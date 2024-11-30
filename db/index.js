const mysql2 = require('mysql2')
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'glass'
})
module.exports = db