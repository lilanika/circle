const express = require('express'); 
const router = express.Router(); 
const {check, validationResult} = require('express-validator')

const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');



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
  //mit req..body bekommen wir zugang zu den post req(gesendet daten an den server )
  console.log(req.body);
  const errors = validationResult(req); 
  //if they are errors
  if(!errors.isEmpty()){
    //lets return 400
return res.status(400).json({errors: errors.array()}); 
  }
  //see if user exists 

// getting data with req.body  better to destructering 

const {name, email, password} = req.body;


try{
//See if user exists //mongoose method
let user = await User.findOne({ email});

//when yes send back an error
if( user){
 res.status(400).json({errors:[{msg:'User already exist'}]});
}

//2. geht users gravatar 
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
 //3. encrypt the password

 const salt = await  bcrypt.genSalt(10);
 user.password = await bcrypt.hash(password, salt);

 //save new user to database
 await user.save(); 

//return json webtoken
  res.send('user registred')
} catch(err){
 console.error(err.message);
 res.status(500).send('Server error');
} 
}); 



module.exports = router;