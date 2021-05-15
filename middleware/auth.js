const jwt = require('jsonwebtoken'); 
const config = require('config'); 

/* Step 1: we want to return a json webtoken once a user register so that they can use that token to auth. and access protected routes with the token. with a look at the payload you know wich user it is.@website www.jwt.io

Step 2: we need to protect our routes by creating a piece of midleware that will verify the token.  we can call jwt.verify(token that sent in through the https headers an we can verify it an allow the user to access 
  
  (passswordis a middleware)

/*this is a middleware function that has access to req and response objects. we getting the token from the header, if there is no token and the route is protected an using this middlewhere we get error msg. */

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