const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const fs = require('fs');
//function


class VideoRender{
    FILE = [];
    constructor(file){
        file.forEach(element => {
            this.FILE.push(element);
        });
    }
    addVideo (req,res,connection ,dirname){

        const videoToken =  jwt.sign({ id: req.file.path}, 'video')
    
        const oldPath = req.file.path;
        const newFileName = videoToken+".mp4"; // itt állíthatod be az új fájlnevet
        const newPath = dirname + '/videos/' + newFileName;
        const userToken = req.params.token
        const fileSize = req.file.size; // itt kérjük le a fájl méretét
    

        const userID = async token=>{
            return await USERS.users.map((item)=>{
                if (item.token == token) {
                    connection.query('CALL addVideo(?,?,?,?)',[newFileName,item.id,videoToken,fileSize],function (error, results, fields) {
            
                        if (error) {
                            console.log(error);
                            return error
                        } else {
                           console.log(results);
                            
                            return results
                        }
                        
                    })
                }
            })
                }
                userID(userToken);
                fs.renameSync(oldPath, newPath);
    }
    
}


function getVideo(path) {
    fs.readdir(path, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(files);
    Video = new VideoRender(files); 
  });

}
let Video =null;
getVideo(__dirname + "/../endpoint/videos")
console.log(Video.FILE);
module.exports = {
    router:router,
    Video:Video,
    getVideo:getVideo
}