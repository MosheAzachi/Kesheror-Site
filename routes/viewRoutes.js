const express = require('express');

const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/profile', viewController.getProfile);
router.get('/gallery', viewController.getGallery);
router.get('/login', viewController.getLogin);
router.get('/forgotpassword', viewController.getForgotPassword);
router.get('/register', viewController.getRegister);
router.get('/store', viewController.getStore);
router.get('/contact', viewController.getContact);

module.exports = router;
