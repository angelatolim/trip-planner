require('dotenv').config()

const express = require('express')
const db = require('../db')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;

router.get('/users/add', (req, res) => {
    res.render('users/add')
})

router.post('/users/add', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const myPlaintextPassword = req.body.password 

    const sql = `
    INSERT INTO
        users
        (name, email, password_digest)
    VALUES
        ($1, $2, $3)
    RETURNING
        *;
    `

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
            db.query(sql, [name, email, hash], (err, result) => {
                if (err) console.log(err);

                console.log(result.rows[0]);
                res.redirect('/')
            })
        })
    })


})

module.exports = router