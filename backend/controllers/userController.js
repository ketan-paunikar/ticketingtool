// asyncHandler is just an easy was to write .then .catch method i.e. promises
// for login and register page we will use mongoose that will return a promise
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')



// @decs    Register a new user
// @route   /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('enter all the fields');
    }


    // FInd if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('user already exist')
    }

    //hash password
    // salt is a random string that makes the hash unpredictable
    //gensalt generates a random text salt for use with hashpw
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);


    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new error('invalid user')
    }
})

// @decs    Login user
// @route   /api/user/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    // check user and passwords, if it matches or not
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Credentials');
    }
})

// @decs    get current user
// @route   /api/users/me
// @access  private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}