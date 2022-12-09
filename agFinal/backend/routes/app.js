const express = require('express');
const router = express.Router();

const app = express();

app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hello from Express');
});

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/agFinal/index.html'));
});

module.exports = router;