const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Router 1 : Get All the Notes using: get "/api/notes/fetchallnotes".login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Router 2 : Add a new Note using: post "/api/notes/addnote".login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(note)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Router 3 : Update an existing Note using: put "/api/notes/updatenote".login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }})

    //Router 4 : Delete an existing Note using: delete "/api/notes/deletenote".login require
    router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        try {
            //find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not found") };

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Note has been deleted " });

        }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    module.exports = router;