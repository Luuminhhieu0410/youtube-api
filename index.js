const express = require('express');
const rateLimit = require('express-rate-limit');    
const app = express();
const path = require('path')
const videoRoute = require('./src/routes/VideoRoute');
const port = 4444;
const notfound = require('./src/services/NotFound');
app.use(express.static(path.join(__dirname,'src','public')));
app.use(express.json());

app.use('/video',videoRoute);

app.use('',notfound);
app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`server is running on http://localhost:${port}`);
})

    