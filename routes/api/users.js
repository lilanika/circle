const express = require('express'); 
const router = express.Router(); 
const config = require('config');
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const User = require('../../models/User');

//@route Post api/auth 
//@desc Register User
//@access Public 

router.post( '/', 
[check('name', 'Name is required')
.not()
.isEmpty(), 
check('email', 'Please include a valid email')
.isEmail(), 
check('password', 'Please enter a password with 6 or more charackters').isLength({min: 6})
],
async (req, res) => {
  //thats the object of data that will send to the route for the body parser you need middleware
  //mit req..body bekommen wir zugang zu den post req(gesendeten daten an den server )
  console.log(req.body);
  const errors = validationResult(req); 

  //if they are errors
  if(!errors.isEmpty()){
return res.status(400).json({errors: errors.array()}); 
  }
  

//get data with destr.
const {name, email, password} = req.body;


try{

//See if user exists //mongoose method
let user = await User.findOne({ email});


if( user){
 return res.status(400).json({errors:[{msg:'User already exist'}]});
}

// get users gravatar 
const avatar = gravatar.url(email, {
  //size
  s:'200',
  r:'pg',
  //default icon
  d:'mm'
})

user = new User({
  name, 
  email, 
  avatar, 
  password
}) 

 //encrypt the password
 const salt = await  bcrypt.genSalt(10);
 user.password = await bcrypt.hash(password, salt);

 //save new user to database
 await user.save(); 

//return json webtoken
  //res.send('user registred')

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
 res.status(500).send('Server error-user reg fail');
} 
}); 



module.exports = router;