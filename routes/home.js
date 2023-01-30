let router = require('express').Router();
const path = require('path');

router
    .get('/', (req, res, next) => {
        res.sendFile(path.resolve('./src/views/index.html'));
    })
;

module.exports = router;