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
app.use(express.static(__dirname + '/public'));

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
        dataArray = JSON.parse(data);
        
        // for (let i = 0; i < dataArray.length; i++) {
        //     const note = dataArray[i];
        //     note.id = i;
            
        // }
        
        //dataArray[dataArray.length - 1].id = dataArray.length - 1;
        res.json(dataArray);
        // res.json({
        //     message: 'success',
        //     data: JSON.parse(data)
        // })
        // console.log('NOTES DATA: ' + data);
        // return data;
    })
});

// add a new note to the db
app.post('/api/notes', ({ body }, res) => {
    console.log("body: ", body);
    myObject.push(body);
    myObject[myObject.length - 1].id = myObject.length - 1;
    var newData = JSON.stringify(myObject, null, 2);

    fs.writeFile(db, newData, err => {
        if (err) throw err;
    
        console.log("New data added");
    })
});

// delete a note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log("Here");
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) {
            console.log('File read failed: ', err);
            return;
        }
        dataArray = JSON.parse(data);
        
        if (dataArray[id]){
            console.log("Now im here");
            if (dataArray[id].id == id) {
                console.log("id: " + dataArray[id].id);
                dataArray.splice(id, 1);
                console.log(dataArray);
    
                fs.writeFile(db, JSON.stringify(dataArray, null, 2), err => {
                    if (err) throw err;
    
                    console.log(id + " removed");
                })
            }
        }
        
    });
    
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
