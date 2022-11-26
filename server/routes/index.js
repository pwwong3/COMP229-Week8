const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage); 
/* GET home page. */
router.get('/home', indexController.displayHomePage); 
/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);
/* GET products page. */
router.get('/products', indexController.displayProductsPage);
/* GET Services page. */
router.get('/services', indexController.displayServicesPage);
/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);
/* GET Router for displaying the login page*/
router.get('/login', indexController.displayLoginPage);
/* POST Router for processing the Login Page*/
router.post('/login', indexController.processLoginPage);
/* GET Router for displaying register Page*/
router.get('/register', indexController.displayRegisterPage);
/* POST Router for processing the register Page*/
router.post('/register', indexController.processRegisterPage);
/* GET Router for processing the Login Page*/
router.get('/logout', indexController.performLogout);

module.exports = router;