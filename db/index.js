const pg = require('pg') //connect to db

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const connectionString = process.env.DATABASE_URL

const pool = new pg.Pool({ // for if you don't want to continuing opening and closing clients
    connectionString: connectionString // incl username and pw if not on mac
})  

module.exports = pool