const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  // Read data from db.json
  app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.json(notes);
  });

  // Create and save a new note
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Generate a unique ID for the note
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('db.json', JSON.stringify(notes));
    res.json(newNote);
  });

  // Bonus: Delete a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFileSync('db.json', JSON.stringify(filteredNotes));
    res.json({ message: 'Note deleted' });
  });
};
