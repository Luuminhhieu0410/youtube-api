const {checkLogin,registerUser,logOut,getName} = require('../controllers/user.controller');
const express = require('express');
const route = express.Router();

// route.get('/login',(req,res)=>{
//     res.send("trang login ");
// })

route.get('/logout',logOut);
route.post('/login',checkLogin);
route.post('/register',registerUser);
route.get('/nameUser',getName);
module.exports = route; 