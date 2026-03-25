const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET = 'your-secret-key'; // TODO: Move to environment variable


// Router 1 : create a user using: Post "/api/auth/createuser". Doesn't require login
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
     let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether a user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Router 2 : Authenticate a user using: Post "/api/auth/login". Doesn't require login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
     let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
              sucesss= false
            return res.status(400).json({ success,error: "please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            sucesss= false
            return res.status(400).json({ success, error: "please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success ,authtoken })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Router 3 : get login user details using: post "/api/auth/getuser". Requires login
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;