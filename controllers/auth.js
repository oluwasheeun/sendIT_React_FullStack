const User = require('../models/Users');

// @desc      Register user
// @route     POST /auth/register
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc      Login user
// @route     POST /auth/login
// @access    Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
      });
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message.red);

    res.status(500).send('Server Error');
  }
};

// @desc      Get current logged in user
// @route     GET /auth/me
// @access    Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message.red);
    res.status(500).send('Server Error');
  }
};
