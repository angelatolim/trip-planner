const express = require('express')
const db = require('../db')
const router = express.Router()

router.post('/activities', (req, res) => {
    const name = req.body.name
    const tripId = req.body.trip_id
    const userId = req.session.userId
    
    // need to check this
    let sql = `
    INSERT INTO
        activities
        (name, trip_id)
    VALUES
        ($1, $2)
    `

    db.query(sql, [name, tripId], (err, result) => {
        if(err) console.log(err);
        res.redirect(`/trips/${tripId}`)
    })
})

router.get('/trips/:tripId/activities/:activityId', (req, res) => {
    const trip = req.params.tripId
    const activityId = req.params.activityId

     const sql = `SELECT * FROM activities WHERE id = $1;`

     db.query(sql, [activityId], (err, result) => {
        if(err) console.log(err);

        const activity = result.rows[0]

        res.render('activities/show', { activity : activity, trip : trip } )
     })
})

router.put('/activities/:id', (req, res) => {
    const name =  req.body.name
    const activityId = req.body.activity_id
    const tripId = req.body.trip_id

    let sql = `
    UPDATE 
        activities
    SET
        name = $1
    WHERE
        id = $2
    `

    db.query(sql, [name, activityId], (err, result) => {
        if(err) console.log(err);

        res.redirect(`/trips/${tripId}`)
    })

})

router.delete('/trips/:tripId/activities/:activityId', (req, res) => {
    const trip = req.params.tripId
    const activityId = req.params.activityId

    let sql = `DELETE activities WHERE id = $1`

    db.query(sql, [activityId], (err, result) => {
        if(err) console.log(err);

        res.redirect(`/trips/${trip}`)
    })
})

module.exports = router