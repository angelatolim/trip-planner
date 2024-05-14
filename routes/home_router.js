const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', (req, res) => {

    let sql = `SELECT * FROM trips;`

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        
        const trips = result.rows
        res.render('home', { trips : trips })
    })

})

module.exports = router