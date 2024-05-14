const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/trips/:id', (req, res) => {
    const sql = `
        SELECT * FROM trips where id = $1
    `

    const activitiesSql = `
    SELECT 
        *
    FROM
        activities
    WHERE
        trip_id = $1
    ;`

    db.query(sql, [req.params.id], (err, result) => {
        if (err) console.log(err);

        const trip = result.rows[0]

        db.query(activitiesSql, [req.params.id], (err, result) => {

            const activities = result.rows
            console.log(activities);

            // comment db

            res.render('show', { trip : trip, activities : activities })
        })

        
    })

})

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/trips', (req, res) => {
    const title = req.body.title
    const origin = req.body.origin
    const destination = req.body.destination
    const status = req.body.status

    const sql = `
    INSERT INTO 
        trips
        (title, origin, destination, status)
    VALUES
        ($1, $2, $3, $4);
    `

    db.query(sql, [title, origin, destination, status], (err, result) => {
        if (err) console.log(err);

        res.redirect('/')
    })

})

router.delete('/trips/:id', (req, res) => {
    let sql=`
    DELETE FROM trips WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {
        if (err) console.log();

        res.redirect('/')
    })

})

router.get('/trips/:id/edit', (req, res) => {
    let sql= `
    SELECT * 
    FROM trips
    WHERE id = $1
    `

    db.query(sql, [req.params.id], (err, result) => {
        if(err) console.log(err);

        const trip = result.rows[0]
        res.render('edit', { trip : trip })
    })
})

router.put('/trips/:id', (req, res) => {
    const title = req.body.title
    const origin = req.body.origin
    const destination = req.body.destination
    const status = req.body.status
    const id = req.params.id

    let sql = `
    UPDATE 
        trips
    SET
        title = $1,
        origin = $2,
        destination = $3,
        status = $4 
    WHERE
        id = $5;
    `

    db.query(sql, [title, origin, destination, status, id], (err, result) => {
        if (err) console.log(err);
        
        res.redirect(`/trips/${id}`)
    })

})

module.exports = router