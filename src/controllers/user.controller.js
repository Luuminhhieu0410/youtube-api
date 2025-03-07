const userModel = require('../models/user.model');
var user = new userModel('', '', '', '');

async function checkLogin(req, res, next) {
    try {
        if (req.body.username == null || req.body.password == null) {
            return res.status(400).json({ message: 'null' });
        }
        const { username, password } = req.body;
        console.log('username | password đăng nhập: ' + JSON.stringify(username) + " | " + password)

        const onlyLettersPattern = /^[0-9A-Za-z]{1,16}$/;
        // if (username.length === 0 || password.length === 0) {
        //     return res.status(400).json({ message: "vui long nhap day du tai toan mat khau" });
        // }
        if (!username.match(onlyLettersPattern) || !password.match(onlyLettersPattern)) {
            return res.status(400).json({ message: "tài khoản chỉ chứa kí tự và số , độ dài từ 1 đến 16" })
        }

        const check = await user.checkLogin(username, password);

        if (check) {
            req.session.userId = user.userId;
            req.session.name = user.name;
            user.setUserName(username);
            
            return res.status(200).json({ message: "success" });
            // res.redirect('/home/video.html')
        }

        return res.status(200).json({ message: "tài khoản mật khẩu sai" });
    } catch (error) {
        console.log(error);
        next();
    }
}

async function registerUser(req, res, next) {
    try {

        var { name, username, password, confirmPassword } = req.body;

        console.log('thong tin dang ky : ' + `${name} || ${username} || ${password} || ${confirmPassword}`);
        const onlyLettersPattern = /^[0-9A-Za-z]{1,16}$/;
        // if(name.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0){
        //     return res.status(400).json({message:"nhập đầy đủ thông tin"});
        // }
        if (name.length > 30) {
            return res.status(400).json({ message: "tên ít hơn 30 ký tự" });
        }
        if (confirmPassword != password) {
            return res.status(400).json({ message: "mật khẩu nhập lại không khớp" })
        }
        if (!username.match(onlyLettersPattern) || !password.match(onlyLettersPattern)) {
            return res.status(400).json({ message: "tài khoản chỉ chứa chữ cái và số , độ dài từ 1 - 16" })
        }

        const checkExits = await user.checkExits(username)  // trả về true false
        if (checkExits) {
            return res.status(400).json({ message: "tài khoản đã tồn tại" })
        }
        const checkInsert = await user.registerUser(name, username, password); // trả về true false
        if (checkInsert) {
            user.setUserName(username);
            req.session.username = user.username; // biến toàn cục
            let dataUserID = await user.getUserId();
            req.session.userId = dataUserID[0].userId;
            // console.log("userID dang ký " + dataUserID[0].userId);

            console.log('userID khi đăng kí ' + req.session.userId);

            // return res.redirect('/videos');
            return res.status(200).json({ message: "success" });
        }
    } catch (error) {
        console.log(error);
        next();
    }
}



async function logOut(req, res, next) {
    req.session.destroy((err) => {
        res.redirect('/home/index.html');
    })
}

async function getName(req, res, next) {
    try {
        
        if(req.session.userId == null) return res.status(400).json({message: "Chưa đăng nhập"});
        // console.log('req : ' + req.session.userId);
      
        let data = await user.getName();
        console.log('data get name : ' + data); 
        res.status(200).json({ name: data });
    } catch (error) {
        console.log("error" + error);
        next();
    }

}
module.exports = { checkLogin, registerUser, logOut,getName};