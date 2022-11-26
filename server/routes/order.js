const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const passport = require('passport');

const orderController = require('../controllers/order');

const requireAuth = (req, res, next) => {
    // check if the user is logged in
    if(!req.isAuthenticated()) return res.redirect('/login');
    next();
};

/* GET Order List page -- READ Operation */
router.get('/', orderController.displayOrderList);

/* POST Route for processing the Add Order */
router.post('/add', orderController.processAddPage)

module.exports = router;