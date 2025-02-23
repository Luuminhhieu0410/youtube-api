const express = require('express');
const rateLimit = require('express-rate-limit');
const route = express.Router();
const videoController = require('../controllers/VideoController');
const limiter = rateLimit({
    windowMs: 60 * 100000, // 100 phút
    max: 5, // giới hạn 5 yêu cầu mỗi 100 phút
    handler: (req, res, next) => {
      console.log('quá request');
        res.status(400).json({
          message: 'Bạn đã gửi quá nhiều request. Vui lòng thử lại sau!' ,
          statusCode: 400
        });
      }
  });

route.get('',videoController.getAllVideo);
route.post('',limiter,videoController.addVideo);
module.exports = route