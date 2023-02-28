const express = require('express')
const router = express.Router()

router.get('/braa', function(req, res) {
    res.send("Hello King Baraa")
})

module.exports = router