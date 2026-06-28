const express = require('express')
const router = express.Router();
const authController = require('../controller/auth.controller')
const passport = require('passport');
require('../config/password')

/**POST /api/auth/register */
router.post('/register', authController.userRegisterController)

/**POST /api/auth/login */
router.post('/login', authController.userLoginController)

/**POST /api/auth/logout */
router.post('/logout', authController.userLogoutController)

router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}))

// Google CallBack
router.get('/google/callback', passport.authenticate('google', {session :false, failureRedirect:'/login'}),
authController.oauthCallback)
//session- tells google to not create a session cookie as we are creating a server stateless with jwt
//failureRedirect - if user cancel the login then passport authmatically send them back into the login page

module.exports = router;