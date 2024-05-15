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
    const tripId = req.params.tripId
    const activityId = req.params.activityId

    const sql = `
    SELECT 
        trips.title AS trip_title, trips.id AS trip_id, activities.name AS activity_name, activities.id
    FROM 
        trips 
    INNER JOIN 
        activities 
    ON 
        activities.trip_id = trips.id
    WHERE 
        trips.id = $1
    AND 
        activities.id = $2
    ;`

    // something wrong with this sql
    const categorySql = `
    SELECT 
        type
    FROM 
        categories 
    INNER JOIN
        activities_categories
    ON
        activities_categories.category_id = categories.id
    WHERE 
        activities_categories.activity_id = $1
    `

    db.query(sql, [tripId, activityId], (err, result) => {
        if(err) console.log(err);

        const activity = result.rows[0]
        console.log(activity);

        db.query(categorySql, [activityId], (err, result) => {
            if(err) console.log(err);

            console.log(result.rows);
            const categories = result.rows

            res.render('activities/show', { activity : activity, tripId : tripId, categories: categories } )

        })
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

    let sql = `DELETE FROM activities WHERE id = $1`

    db.query(sql, [activityId], (err, result) => {
        if(err) console.log(err);

        res.redirect(`/trips/${trip}`)
    })
})

module.exports = router