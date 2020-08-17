const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // const token = req.header('auth-token');
  const token = req.cookies.auth_token;
  console.log(req.cookies.auth_token);
  if(!token) 
    return res
    .status(401)
    .json({msg: 'Access Denied!'});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified)
      return res
      .status(401)
      .json({msg: "Token verification failed, authorization denied"});
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
}
