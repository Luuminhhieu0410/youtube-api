
// class Person {
//     constructor(executor) {
      
//       const resolve = (param) => this.print(param);
//       const reject = (param) => this.print(param);
  
     
//       executor(resolve, reject);
//     }
  
//     print(param) {
//       console.log(param);
//     }
//   }
  
  
//   var a = new Person((resolve, reject) => {
//     resolve("hello");  
//     reject("world");   
//   });

// var fs = require('fs');
// console.time('tong thoi gian')
// var VideoObject = JSON.parse(fs.readFileSync('./data.json'));
// var newData = {
//   "title": "K-391 - Escape (Vexento Remix)",
//   "videoId": "i0gqu38rdYM",
//   "thumbnail": "default.jpg"
// }

// VideoObject.data.push(newData);

// console.log(VideoObject);

// fs.writeFileSync('./data.json',JSON.stringify(VideoObject));
// console.log('success');
// console.timeEnd('tong thoi gian')

// var fs = require('fs');
// var path = require('path');
// const getVideoData = () =>{
//     return new Promise((resolve,reject) =>{
//         const data = fs.readFile(('dataTest.json'),(err,data) =>{
//             if(!err) resolve(data.toString());
//             else reject(err);
//         })
//     })
// };
// const addVideoData = (videoObject) =>{
//     getVideoData()
//     .then((dataInFile) =>{
//         // console.log(dataInFile);
//         var convertData = JSON.parse(dataInFile);
//         // console.log("truoc khi them " + convertData.data[0].title);
//         convertData.data.push(videoObject);
//         console.log("sau khi them" + convertData.data[1].title);
        
//         return new Promise((resolve,reject) =>{
//             fs.writeFile('dataTest.json',JSON.stringify(convertData),(err) =>{
//               if(!err )resolve('thanh cong');
//               else reject(err);
//             })
//         })
//     .then((data) => console.log(data)).catch((err)=> console.log(err));

//         // fs.writeFileSync('dataTest.json',JSON.stringify(convertData));
//         // console.log('them thanh cong')
//     })
// }

// var newData = {
//   "title": "new title",
//   "videoId": "i0gqu38rdYM",
//   "thumbnail": "default.jpg"
// }

// test();

// const url = require('url');
// const adr = 'https://www.youtube.com/watch?v=lEMRJhtamGc&list=RDx-_2eo7cSI0&index=8';
// const q = url.parse(adr,true);
// const qdata = q.query;
// console.log(qdata.v);

// function getYouTubeID(url) {
//     let urlObj = new URL(url);
//     if (urlObj.hostname === "youtu.be") {
//         return urlObj.pathname.substring(1); 
//     } else {
//         return urlObj.searchParams.get("v"); 
//     }
// }

// let url = "https://www.youtube.com/watch?v=8appFwzGr1c";

// console.log(getYouTubeID(url));


// class person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//      getname(){
//         console.log(this.name);
//         console.log(this.age);
//     }
// }
// var person1 = new person('hieu');
// person1.getname();

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('<h1>Home page</h1>');
// });

// app.get('/:id', (req, res) => {
//   res.send(`<h1>${req.params.id}</h1>`);
// });

// app.listen(3000, () => {
//   console.log('Server is up on port 3000');
// });

// var fs = require('fs');
// const a = Promise.resolve(123);
// a.then((data) =>{
//     const da = fs.readFile('./index.js',(err,data) =>{
//         console.log(data.toString());
//     })
//     console.log(data);
// })

