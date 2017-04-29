const express = require('express');
const router = express.Router();
const path = require('path');

const api = require('./api');

router.use('/api', enableCORS, api);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

function enableCORS(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = router;
