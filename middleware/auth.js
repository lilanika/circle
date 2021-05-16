const jwt = require('jsonwebtoken'); 
const config = require('config'); 

//middleware function

module.exports = function(req, res, next) {
 // get token from header 
  const token = req.header('x-auth-token');
  console.log( token , 'get token from header works')

  // if no token 
  if(!token) {
    return res.status(401).json({msg:'no token, authorization denied'})
  }

  //verify token 
  /*  if there is a token but its not valid then its going to run this catch wich will say its not valid. If it is then going to decode it through jwt.verify. */
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    console.log('verify token works')
    next();

  } catch(err) {
 res.status(401).json({msg:'token is not valid'})
  }
}