const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // const token = req.header('auth-token');
  const token = req.cookies.auth_token.token;
  console.log(req.cookies.auth_token.token);
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  } 
}

// try {
//   const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
//   req.uniqueData = decoded;
//   next();
// } catch (err) {
//   return res.status(401).json({
//     message: 'Auth failed'
//   });
// }