// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

// import the check function from express-validator and the handleValidationError function you created.
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// Make a middleware called validateSignup that will check these keys of username, email, and password and validate them
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a first name with at least 2 characters.'),
    check('firstName')
      .isAlpha()
      .withMessage('First name must be letters'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a last name with at least 2 characters.'),
    check('lastName')
      .isAlpha()
      .withMessage('Last name must be letters'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  // Sign up, connect the POST /api/users route to the validateSignup middleware
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      const usernameExists = await User.findOne({ where: {username}})
      const emailExists = await User.findOne({where: {email}})
     
      if(usernameExists){
         return res.status(403).json({
          message: "User already exists",
          statusCode: '403',
          errors: {
            user: 'User with that username already exists'
          }
        }) }
       if (emailExists){
          return res.status(403).json({
            message: "User already exists",
            statusCode: '403',
            errors: {
              user: 'User with that email already exists'
            }
          })
        }
      const user = await User.signup({ email, username, firstName, lastName,password });
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }
  );
module.exports = router;