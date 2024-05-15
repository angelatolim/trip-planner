const express = require('express')
const db = require('../db')
const router = express.Router()


//           /trips/3      /activities/13         /categories
router.post('/trips/:tripId/activities/:activityId/categories', (req, res) => {
    const type = req.body.type
    console.log(type);
    const tripId = req.params.tripId
    const activityId = req.params.activityId

    let sqlInsertCategory = `
    INSERT INTO
        categories
        (type)
    VALUES
        ($1)
    RETURNING id;
    `

    db.query(sqlInsertCategory, [type], (err, result) => {
        if (err) console.log(err);

        const categoryId = result.rows[0].id

        sqlLinkCategory = `
        INSERT INTO
            activities_categories
            (activity_id, category_id)
        VALUES
            ($1, $2)
        `

        db.query(sqlLinkCategory, [activityId, categoryId], (err, result) => {
            if (err) console.log(err);
            res.redirect(`/trips/${tripId}/activities/${activityId}`)
        })
    })
})

module.exports = router