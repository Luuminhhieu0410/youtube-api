const db = require('./src/dbconnection/db');


const getVideoData = async () => {
    try {
        const [rows] = await db.query('SELECT title, videoId, thumbnail FROM videos');
        const jsonData = {
            data : rows
        }
        return jsonData;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
};


const addVideoData = async (videoObject) => {
    try {
        const { title, videoId, thumbnail } = videoObject;
        const sql = 'INSERT INTO videos (title, videoId, thumbnail) VALUES (?, ?, ?)';
        const values = [title, videoId, thumbnail];

        await db.query(sql, values);
        console.log("Thêm video thành công");
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu:", error);
        throw error;
    }
};
getVideoData().then((data) => console.log(data));
module.exports = { getVideoData, addVideoData };
