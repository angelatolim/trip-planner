const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', (req, res) => {

    let tripsSql = `SELECT * FROM trips;`

    db.query(tripsSql, (err, result) => {
        if (err) console.log(err);

        const trips = result.rows
        
        let usersSql = `SELECT * FROM users;`
        db.query(usersSql, (err, result) => {
            if(err) console.log(err);

            const users = result.rows

            res.render('home', { trips : trips, users : users })
        })
        
    })

})

module.exports = router