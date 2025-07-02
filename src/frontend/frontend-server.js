const express = require('express');
const path = require('path');

const app = express();
const port = 8889;

// Servir les fichiers statiques
app.use(express.static('public'));

app.get('/affichage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Frontend server listening at http://localhost:${port}`);
});