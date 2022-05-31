const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


// registerUser, loginUser & getMe function has been created in userController.js to make it easy to read
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router