var fs = require('fs');
var path = require('path');
const getVideoData = () =>{
    return new Promise((resolve,reject) =>{
        const data = fs.readFile(('data.json'),(err,data) =>{
            if(!err) resolve(data.toString());
            else reject(err);
        })
    })
};

const addVideoData = (videoObject) =>{
    getVideoData()
    .then((dataInFile) =>{
        console.log(dataInFile);
        var convertData = JSON.parse(dataInFile);
        console.log("truoc khi them " + convertData.data[0].title);
        convertData.data.push(videoObject);
        console.log("sau khi them" + convertData.data[1].title);
        
        return new Promise((resolve,reject) =>{
            fs.writeFile('data.json',JSON.stringify(convertData),(err) =>{
              if(!err )resolve('thanh cong');
              else reject(err);
            })
        })
    .then((data) => console.log(data)).catch((err)=> console.log(err));

        // fs.writeFileSync('dataTest.json',JSON.stringify(convertData));
        // console.log('them thanh cong')
    })
}
module.exports = {getVideoData,addVideoData};