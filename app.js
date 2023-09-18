import express from 'express';
import {
    addNote, 
    removeNote, 
    listNotes, 
    readNote, 
    loadNotes
} from './notes.js';
import yargs from 'yargs';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

yargs.version('1.1.0');

app.get('/', (req, res) => {
    res.send('Welcome to the Notes App!');
  });

app.get('/notes', (req, res) => {
    const notes = loadNotes();
    const titles = notes.map(note => note.title);
    res.json(titles); // Send the titles as a JSON response
});

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    handler() {
        listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });