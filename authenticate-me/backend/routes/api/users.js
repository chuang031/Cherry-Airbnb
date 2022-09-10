// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

// import the check function from express-validator and the handleValidationError function you created.
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')


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
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }
  );
module.exports = router;