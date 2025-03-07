const connection = require('../database/db');
class users {
    constructor(userId,username,name,password) {
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.password = password;
    }
    setUserName(username){
        this.username = username;
    }
    async checkLogin(username, password) {
        try {
        
            const [data] = await connection.query(`select userId,name from users where username = "${username}" and password = "${password}" LIMIT 1`);
            if (data.length != 0) {
                this.name = data[0].name;
                this.userId = data[0].userId;
                return true;
            }
            return false;
        } catch (error) {
            return false;       
        }
    }

    async getUserId() {
        try {
            const [data] = await connection.query(`select userId from users where username = "${this.username}" LIMIT 1`)
            return data;   
        } catch (error) {
            return error;
        }
    }
    async getName() {
        try {
            console.log("username  : " + this.username);
            const [data] = await connection.query(`select name from users where username = '${this.username}'  LIMIT 1;`)
            console.log('data name : ' + data[0].name);
            return data[0].name;
        } catch (error) {
            console.log('error ' + error);
            return error;
        }
    }

    async checkExits(username){ // kiem tra ton tai
        try {
            const [data] = await connection.query(`select username from users where username = '${username}' LIMIT 1`);
            if(data.length != 0 ) {
                return true;
            }
            return false;
        } catch (error) {
            return error;
        }
    }  
    async registerUser(name,username,password){
        try {
            const [data] = await connection.query(`insert into users(name,username,password) values ('${name}','${username}','${password}')`);
            if(data.affectedRows > 0 ) {
                
                return true;
            }   
            return false;
        } catch (error) {
            return error;
        }
    }
}


module.exports = users