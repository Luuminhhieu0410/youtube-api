const {getVideoOfUser,deleteVideo,addVideo} = require('../controllers/video.controller');
const express = require('express');
const route = express.Router();

route.get('',getVideoOfUser);
route.delete('/:videoId',deleteVideo);
route.post('',addVideo);
// route.get('/nameUser',getName);
module.exports = route;