const express = require('express'); 
const config = require('config');
const router = express.Router(); 
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator')
/*

const config = require('config');
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
*/


//@route GET api/profile/me
//@desc Get current users profile
//@access Private

/* 
router.get('./', auth, (req, res) => res.send('Profile route'));
*/

/*we are using async await cause Monogge returns a promise*/

router.get('/me', auth,  async (req, res) => {

  try {

  const profile = await Profile.findOne({user: req.user.id}).populate('user',
    [ 'name','avatar']);
    console.log('im working')


    if(!profile){
      return res.status(400).json( {msg:'There is no profile for this user'});
    }

    res.json(profile); 

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

  }
});

//@route Post api/profile
//@dec Create or update user profile 
// acccess Private
/*
router.post( 
  '/',
 auth,
 
  check('dailyTasks', 'dailyTasks is required')
  .notEmpty(),

  async (req, res) => {
    const errors =validationResult(req); 
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() })
    }
  //if the validatior passes destruc.
 const { dailyTasks,
  //spread the rest of the fields we dont need to check
   ...rest} 
   = req.body;

 //Build profile Object 

 const profileFields = {
  user: req.user.id,
  skills: Array.isArray(skills)
    ? skills
    : skills.split(',').map((skill) => ' ' + skill.trim()),
  ...rest
};
  }

console.log(dailyTasks); 

res.send('Hello');

) */

router.post(
  '/',
  auth,
  check('dailyTasks', 'Status is required').notEmpty(),
 
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      dailyTasks,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      dailyTasks: Array.isArray(dailyTasks)
        ? dailyTasks
        : dailyTasks.split(',').map((skill) => " " + skill.trim()),
      ...rest
    }
    

    try{
      let profile = await Profile.findOneAndUpdate(
          {user: req.user.id}, 
          {$set: profileFields }, 
          { new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route GET api/profile 
//@desc get all profiles
//@access Public 

router.get('/', async(req,res) => {

try {

  const profiles = await Profile.find().populate(
  'user', 
  ['name', 'avatar']);
  res.json(profiles);
}catch (err){
  console.error(err.message); 
  res.status(500).send('Server Error')
}
})

//@route GET api/profile /user/:user_id
//@desc GET profile by User ID
//@access Public 

router.get(
  '/user/:user_id', async(req,res) => {

try {

  const profile = await Profile.findOne({user: req.params.user_id}).populate(
  'user', 
  ['name', 'avatar']);
  
  if(!profile) 
  return res.status(400).json({msg: 'Profile not found'})

   return res.json(profile);
}catch (err){
  console.error(err.message); 
  if(err.kind == 'ObjectId'){
    return res.status(400).json({msg: 'Profile not found'})
  }
   return res.status(500).send('Server Error')
}
})


//@route DELETE api/profile 
//@desc Delete profile by User ID
//@access Private

router.delete('/', auth, async (req, res) => {

 try{
   
   //remove profile
   await Profile.findOneAndRemove({user: req.user.id});
   res.json(profile)

   await User.findOneAndRemove({_id: req.user.id});
   res.json({msg: 'Your account is removed'})
   
 } catch(err) {
   console.log(err.message); 
   res.status(500).send('Server Error')
 }
});





module.exports = router;



