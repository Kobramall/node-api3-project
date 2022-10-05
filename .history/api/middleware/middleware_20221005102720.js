const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
const timestamp = new Date().toLocaleString()
const method = req.method
const url = req.originalUrl
console.log(`[${timestamp}] ${method} to ${url}`)
next()
}

 async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.findById(req.params.id)
    if(user) {
      req.hub = hub;
      next()
    } else{
      res.status(404).json({ message: "user not found" });
    }
  } catch (err){
     req.status(400).json({message: "not sure what happened"})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (
    name !== undefined && typeof name === 'string' && name.length
  ){
    next()
  }else {
    res.status(400).json({message: "missing required name field"})
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { post } = req.body;
  if (
    post !== undefined && typeof post === 'string' && post.length
  ){
    next()
  }else {
    res.status(400).json({message: "missing required text field"})
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost, validateUser, validateUserId
}