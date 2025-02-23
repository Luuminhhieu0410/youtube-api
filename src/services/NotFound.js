const notfound = (req,res,next) =>{
    res.status(404).send('Trang không tồn tại');
}
module.exports = notfound