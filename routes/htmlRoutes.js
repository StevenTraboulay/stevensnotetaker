//this is our routes for the HTML handling
const path = require('path');
const router = require('express').Router();


// making the /notes respond to the notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});


//the other index routes
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;