require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./index.js')

const email = 't@t.co' 
const myPlaintextPassword = 't'

const sql = `
INSERT INTO
    users
    (email, password_digest)
VALUES
    ($1, $2)
RETURNING
    *;
`

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
        db.query(sql, [email, hash], (err, result) => {
            if (err) console.log(err);

            console.log(result.rows[0]);
        })
    })
})