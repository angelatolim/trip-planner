const express = require('express')
const db = require('../db');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn');
const router = express.Router()

router.post('/comments', ensureLoggedIn, (req, res) => {
    
})