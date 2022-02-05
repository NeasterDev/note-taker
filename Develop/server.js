const express = require('express');
const fs = require('fs');
const path = require('path');
const db = './db/db.json';
const app = express();
const PORT = 3000;

var data = fs.readFileSync(db);
var myObject = JSON.parse(data);

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//catchall get
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    // return index.html
});

// get all notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    // return notes.html
});

// get all the notes in the db file
app.get('/api/notes', (req,res) => {
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            console.log('File read failed: ', err);
            return;
        }
        notes.push(data);
        res.json({
            message: 'success',
            data: JSON.parse(data)
        })
    })
});

// add a new note to the db
app.post('/api/notes', ({ body }, res) => {
    myObject.push(body);
    var newData = JSON.stringify(myObject, null, 2);

    fs.writeFile(db, newData, err => {
        if (err) throw err;
    
        console.log("New data added");
    })
});

// delete a note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: 'success',
        data: id
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
