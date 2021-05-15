const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth')
const config = require('config');
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User =require('../../models/User')


//@route api/auth 
//@desc Test route
//@access Public 

/*
router.get('/', auth, (req, res) => res.send('auth route'))
*/

// auth (middleware) inside the get will protect the routes. 

router.get('/', auth, async (req, res) => {
 try { 

  const user = await User.findById(req.user.id).select('-password');
  res.json(user);

 }catch(err){
console.error(err.message)
res.status(500).send(' auth.js return UserData failed')
 }
});


//@route Post api/auth 
//@desc Authenticate user an get token 
//@access Public 
//The purpose of this route is get the tokens so that you can make requeist to private routes

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
//See if user exists //mongoose method
let user = await User.findOne({ email});

//when there is no user
if(!user){
 return res.status(400).json({errors:[{msg:'invalid credentials'}]});
}

//match passwords  with method from bcrypt: compare 
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