import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.static('public'));

// Routes

app.get('/level/:slug', (req, res) => {
    res.sendFile(__dirname + '/public/level/index.html');
});


// Start server
app.listen(port, () => {
    console.log(`Server executing at http://localhost:${port}`);
});