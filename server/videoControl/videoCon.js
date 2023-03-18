const express = require('express');
const router = express.Router();

const fs = require('fs');
//function
let Video =null;

class VideoRender{
    FILE = [];
    constructor(file){
        file.forEach(element => {
            this.FILE.push(element);
        });
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


module.exports = {
    router:router,
    getVideo:getVideo
}