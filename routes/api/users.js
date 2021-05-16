const express = require('express'); 
const router = express.Router(); 
const config = require('config');
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url')



const User = require('../../models/User');

//@route POST api/users
//@desc Register User
//@access Public 


// SignUp a user  -> sending data  to server
router.post( '/', 
[check('name', 'Name is required').notEmpty(), 
check('email', 'Please include a valid email').isEmail(), 
check('password', 'Please enter a password with 6 or more charackters').isLength({min: 6})
],
async (req, res) => {
  //thats the object of data thats will be send to this route
  // we have to init the middleware )in server.js) for the body parser
  console.log(req.body);
  //validatation if the user doesnt send the right stuff. 
  const errors = validationResult(req); 
  if(!errors.isEmpty()) {
  return res.status(400).json({errors: errors.array()}); 
  }
  
  //get data with destr.
  const {name, email, password} = req.body;


try {
//See if user exists 
let user = await User.findOne({ email});
if( user) {
 return res.status(400).json({errors:[{msg:'User already exist'}]});
}

// get users gravatar 
const avatar = normalize(
  gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  }),
  { forceHttps: true }
);


//create new User
user = new User({
  name, 
  email, 
  avatar, 
  password
}) 

 //Encrypt the password
 const salt = await  bcrypt.genSalt(10);
 user.password = await bcrypt.hash(password, salt);

 //save new user to database
 await user.save(); 

//return json webtoken
  /* Here we creat the payload */

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
    }
    );
} catch(err){
 console.error(err.message);
 res.status(500).send('Server error-user registration fail');
} 
}); 

module.exports = router;