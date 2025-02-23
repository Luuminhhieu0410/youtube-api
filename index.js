const express = require('express');
const rateLimit = require('express-rate-limit');    
const app = express();
const path = require('path')
const videoRoute = require('./src/routes/VideoRoute');
const port = 4444;
app.use(express.static(path.join(__dirname,'src','public')));
app.use(express.json());
// const limiter = rateLimit({
//     windowMs: 60 * 1000, // 1 phút
//     max: 5, // giới hạn 5 yêu cầu mỗi phút
//     message: 'Too many requests from this IP, please try again after a minute'
//   });
  
//   app.use(limiter);
// app.get('/test',limiter,(req,res)=>{
//     res.send('123');
// })
app.use('/video',videoRoute);
app.listen(port,(err)=>{
    if(err) console.log(err);
    
    else console.log(`server is running on http://localhost:${port}`);
})

