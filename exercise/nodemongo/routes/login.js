const express = require('express');
const router = express.Router();
const { UserModel, validateUser } = require('../models/registerModel')

router.get('/', function (req, res) {
    console.log("sucess");
    res.send("sucess");
});

router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) {

        res.status(400).send({ "error": error.details[0].message });
    } else {
        const userData = new UserModel(req.body);
        const user = await userData.save();
        console.log(`user registered ${user}`)
        res.status(201).send({ "data": "sucess", "user": user });
    }
    // console.log(error);
    console.log(req);
    // res.send("sucess");
});

module.exports = router;
