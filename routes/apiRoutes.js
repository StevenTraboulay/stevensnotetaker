const router = require('express').Router();
const store = require('../db/store');


//GET function in the router
// it will respond with th enotes
router.get('/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//posts /transfers the notation info over
router.post('/notes', (req,res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//deleting the notes  need to conect to ID of it
router.delete('/notes/:id', (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});


module.exports = router;