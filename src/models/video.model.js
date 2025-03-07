const db = require('../database/db');

class video {
    constructor(userId) {
        this.userId = userId;
        this.title;
        this.videodId;
        this.thumbnail;
    }

    async getVideoData() {
        try {
            const [rows] = await db.query(`SELECT title, videoId, thumbnail FROM videos where userId = ${this.userId}`);
            const jsonData = {
                data: rows
            }
            return jsonData;
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            throw error;
        }
    };

    async addVideoData(videoObject) {
        try {
            const { title, videoId, thumbnail } = videoObject;
            const sql = 'INSERT INTO videos (userId,title, videoId, thumbnail) VALUES (? , ?, ?, ?)';
            const values = [this.userId, title, videoId, thumbnail];

            await db.query(sql, values);
            console.log("Thêm video thành công");
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
            throw error;
        }
    };
    async deleteVideo(videoId) {
        try {
            // console.log('userId trong Models: ' + this.userId + "videoid Trong ham xoa cua models  : " + videoId);
            const [data] = await db.query(`delete from videos where userId = ${this.userId} and videoId = '${videoId}'`);
            return data;
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
            throw error;
        }
    }
    
}


module.exports = video;
