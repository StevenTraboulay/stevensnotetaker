const util = require("util");
const fs = require("fs");

//using UUiD to geenrate unique ID pacakges
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writefileAsync = util.promisify(fs.writeFile);

//note database creation and amending and connecting
//creating the class to store it
class store {
  //to read the notes
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  // to write the notes
  write(note) {
    return writefileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      //if its not in an array send back
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
      const { title, text } = note;

      if (!title || !text) {
          throw new Error("Note 'title' and 'text' cannot be blank, fill it out");
      }

      // add a unique id to note with that UUID package.
      const newNote = { title, text, id: uuidv1() };

      // retrieve all notes add new note write all the updated notes

      return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
      //get all notes and write file
      return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new store();