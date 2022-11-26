const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

/* POST Router for processing the Login Page*/
router.post('/login', indexController.processLoginPage);
/* POST Router for processing the register Page*/
router.post('/register', indexController.processRegisterPage);
/* GET Router for processing the Login Page*/
router.get('/logout', indexController.performLogout);

module.exports = router;