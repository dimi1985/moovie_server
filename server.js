const sharedFolderPath = '\\\\DESKTOP-35LH4HL\\Movies'; // Update with your shared folder path

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Apply CORS middleware
app.use(cors());

app.use('/movies', express.static(sharedFolderPath));

app.get('/movies', (req, res) => {
    if (fs.existsSync(sharedFolderPath)) {
        const files = fs.readdirSync(sharedFolderPath);
        const folderNames = files.filter(file => fs.statSync(path.join(sharedFolderPath, file)).isDirectory());
        res.json(folderNames);
        
    } else {
        res.status(404).send('Shared folder not found');
    }
});

// Route to serve movie posters

app.get('/movies/:movieName/poster', (req, res) => {
    const movieName = req.params.movieName;
    const posterPath = path.join(sharedFolderPath, movieName, `${movieName}.ico`);
    if (fs.existsSync(posterPath)) {
        res.sendFile(posterPath);
    } else {
        res.status(404).send('Poster not found');
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
