const express = require('express');
const router = express.Router();
const registerController = require('../controllers/resgisterController');

router.post('/register', registerController.handleNewUser);

module.exports = router;
