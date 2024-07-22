const express = require('express');
const User = require ('../models/User');
const router = express.Router();
const {  body, validationResult  } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRATE = 'utsavisgoodb$oy';


// ROUTE = 1 :Create a User : post "/api/auth/createuser".no login required
router.post('/createuser',[
    body('name','Enter the valid name').isLength({ min: 3 }),
    body('email','Enter the valid email').isEmail(),
    body('password','Description must be atlist 5 characters').isLength({ min: 5 })
],async(req,res)=>{
  //if there are errors, return bed request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

  try{
       //check Whether the user with this email exists already
    let user = await User.findOne({email : req.body.email});
    if (user){
      return res.status(400).json({error : "sorry a user with the email already exists"})
    }
    //await means stop and prosses the value then go
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,    
      })
      // .then(user => res.json(user))
      // .catch(err=> {console.log(err)
      // res.json({error :'Please enter a unque value for email', message : err.message})})
      const data = {
        user:{
        id : user.id
        }
      }
     const authtoken =  jwt.sign(data, JWT_SECRATE);
     

      // res.json (user);
      res.json({authtoken})

    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal server error")
    }
} )

//ROUTE = 2 :authenticate a User : post "/api/auth/login".no login required
router.post('/login',[
  body('email','Enter the valid email').isEmail(),
  body('password','password cannot be blank').exists(),
],async(req,res)=>{
  let success = false;
  //if there are errors, return bed request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne ({email});
    if(!user){
      return res.status(400).json({error : "please try to login with correct credentials"})

    }

    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({ success ,error : "please try to login with correct credentials"})
    }
    const data = {
      user:{
      id : user.id
      }
    }
   const authtoken =  jwt.sign(data, JWT_SECRATE);
   success = true;
    res.json({success,authtoken})


  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ")
  }

})

//ROUTE = 3 :get loggedin User details : post "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async(req,res)=>{

  try {
    userid = req.user.id;
    let user = await User.findById (userid).select("-password")
    res.send(user);
  } catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error ")
  }

})


module.exports = router;



