const url = require('url');
const { getVideoData, addVideoData } = require('../models/VideoModel');
const getAllVideo = async (req, res, next) => {
    try {
        var allVideodata = await getVideoData();
        return res.json(JSON.parse(allVideodata));
    } catch (error) {
        console.log(error);
        next();
    }
}

const apiKey = "AIzaSyDbZlaKeF7eXiKJqoNeWvgS0J6ocYgqrAc";
var videoId = '';
var linkUrl = '';


const addVideo = async (req, res, next) => {
    try {
        const linkYoutube = req.body.linkYoutube;
        console.log('Link nhận được:', linkYoutube);

        var allVideodata = await getVideoData();
        allVideodata = JSON.parse(allVideodata);
        allVideodata = allVideodata.data;

        var videoId = '';
        try {
            let urlObj = new URL(linkYoutube);
            if (urlObj.hostname === "youtu.be") {
                videoId = urlObj.pathname.substring(1);
            } else {
                videoId = urlObj.searchParams.get("v");
            }


        } catch (_) {
            console.log('URL không hợp lệ');
            return res.status(400).json({ message: 'Đừng nhập linh tinh , web bug không fix được' });
        }
        const check = allVideodata.findIndex((elements) => elements.videoId == videoId )
        // allVideodata.forEach(element => {
        //     console.log('phan tu ' + element.videoId);
        // });
        console.log('video id : ' + videoId)
        if (check >  0) {
            console.log('check : ' + check);
            return res.status(400).json({ message: 'video đã tồn tại !' });
        }

        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!youtubeRegex.test(linkYoutube)) {
            console.log('Không phải link YouTube hợp lệ');
            return res.status(400).json({ message: 'Không phải link YouTube hợp lệ' });
        }

        if (!videoId) {
            console.log('Không tìm thấy video ID');
            return res.status(400).json({ message: 'Không tìm thấy video ID' });
        }


        const linkUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}&fields=items(snippet/title)`;
        const response = await fetch(linkUrl);
        const dataAPI = await response.json();

        if (!response.ok || !dataAPI.items || dataAPI.items.length === 0) {
            console.log('Không tìm thấy video trên YouTube');
            return res.status(404).json({ message: 'Không tìm thấy video trên YouTube' });
        }

        const videoTitle = dataAPI.items[0].snippet.title;
        console.log('Tiêu đề video:', videoTitle);


        const newData = {
            title: videoTitle,
            videoId: videoId,
            thumbnail: "default.jpg"
        };
        addVideoData(newData);


        res.json({ message: 'Thêm video thành công', video: newData });

    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
}
module.exports = { getAllVideo, addVideo };
