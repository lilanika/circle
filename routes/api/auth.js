const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth')
const config = require('config');
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User =require('../../models/User')


//@route  GET api/auth 
//@desc    Get user by token
//@access  Private


// auth --> protected route (with token)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/auth 
//@desc login user get token 
//@access  Public 


router.post( 
  '/', 
[
check('email', 'Please include a valid email')
.isEmail(), 
check('password', 
'Password is required').exists()
],

async (req, res) => {
  //checking errors in the body
  console.log(req.body);
  const errors = validationResult(req); 

  //if they are errors
  if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()}); 
  }
  

// getting data with req.body with destruc.
const {email, password} = req.body;


try{
// if user = true
let user = await User.findOne({ email});

//when there is no user send back an error
if(!user){
 return res.status(400).json({errors:[{msg:'invalid credentials'}]});
}

//match passwords  with method from bcrypt - > compare
//compare return a promise
const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch) {
  return res.status(400)
  .json (
    { 
    errors: [{msg: 'Invalid Credentials'}] 
  }
  )
}; 

//payload
  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(
    payload, 
    config.get("jwtSecret"),
    {expiresIn: 3600000},
    (err, token) => {
if(err) throw err; 
res.json({ token });
    } );
} catch(err){
 console.error(err.message);
 res.status(500).send('Server error-user reg fail');
} 
}); 

module.exports = router;