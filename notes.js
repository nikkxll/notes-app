import fs from 'fs'
import chalk from 'chalk';

// Adding notes function

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((inst) => inst.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('\nNew note added!'));
    } else {
        console.log(chalk.red.inverse('\nNote title taken!'));
    }
};

// Removing notes function

export const removeNote = (title) => {
    const notes = loadNotes();
    const reduced = notes.filter((inst) => inst.title !== title);

    if (reduced.length !== notes.length) {
        console.log(chalk.green.inverse('\nNote removed!'));
        saveNotes(reduced);
    } else {
        console.log(chalk.red.inverse('\nNo note found!'));
    }
};

// Listing notes function

export const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.blue.inverse('\nYour notes:'));

    notes.forEach((note) => {
        console.log(note.title);
    })
};

// Read note function

export const readNote = (title) => {
    const notes = loadNotes();
    const exactNote = notes.find((inst) => inst.title === title)
    if (exactNote) {
        console.log(chalk.bold('\nTitle: ' + exactNote.title));
        console.log('Body: ' + exactNote.body);
    } else {
        console.log(chalk.red('\nNo note was found!'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

export const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
};