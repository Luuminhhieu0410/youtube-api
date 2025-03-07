const express = require("express");
const session = require("express-session");
const userRoute = require('./src/routes/user.route');
const videoRoute = require('./src/routes/video.route');
const notFound = require('./src/services/NotFound');
const { execute } = require("./src/database/db");
// const bodyParser = require("body-parser");
const port = 3003;
const app = express();

// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: "Kj#9p$mNqL2@xZvW8&bRtY4*fHcDs5!j",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 , httpOnly:true} // Session tồn tại 600 giây
}));
app.use('/home',express.static('./src/public'))

app.get('/',(req,res,next) =>{
    if(!req.session.userId) res.redirect('/home');
    else res.redirect('/home/video.html')
    
})
app.use('/user',userRoute);

app.use('/videos',videoRoute);
app.use('',notFound);
app.listen(port, () => console.log(`http://localhost:${port}`));
