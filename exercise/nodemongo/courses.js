const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    console.log(req);

    res.send('courseds');
});

router.get('/inside', function (req, res) {
    console.log('inside courses');
    res.send('inside courseds');
});
module.exports = router;