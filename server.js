const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files (HTML, JS, etc.)
app.use(express.static('public'));

// Route to serve a large file for download
app.get('/download', (req, res) => {
    const file = path.join(__dirname, 'largefile.bin');
    res.download(file);
});

// Route to handle file upload (simple)
app.post('/upload', express.raw({ limit: '100mb' }), (req, res) => {
    const file = req.body;
    fs.writeFile('uploadedfile.bin', file, err => {
        if (err) {
            res.status(500).send('Upload failed');
        } else {
            res.send('Upload successful');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
