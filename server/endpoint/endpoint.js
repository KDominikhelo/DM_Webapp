const express = require("express")
const router = express.Router();
const conn = require("../conn/conn");
const videoCon = require("../videoControl/videoCon");
var jwt = require('jsonwebtoken');
const multer = require('multer');
const fs =require("fs")
router.use(conn.router);
router.use(videoCon.router)
videoCon.getVideo(__dirname+"/videos");

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })
 //router.use(express.static(__dirname+'/../videoControl/videos'));
 
  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/videos')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 } ,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'video/mp4') {
        return cb(new Error('Only video/mp4 files are allowed!'));
      }
      cb(null, true);
    }
  });

// Routes
router.route("/video/videoManager/token/:token").post(upload.single('video'), (req, res) => {
    const videoToken =  jwt.sign({ id: req.file.path}, 'video')
    
    const oldPath = req.file.path;
    const newFileName = videoToken+".mp4"; // itt állíthatod be az új fájlnevet
    const newPath = __dirname + '/videos/' + newFileName;
    const userToken = req.params.token
    const fileSize = req.file.size; // itt kérjük le a fájl méretét

    conn.videoMaker(oldPath.split("videos")[1],userToken,videoToken,fileSize);
    
    fs.renameSync(oldPath, newPath);
  
    res.send('File uploaded successfully');
  });
  
  router.get('/video/getvideo/:fileName', function(req, res) {
    const videoPath = __dirname+ '/videos/'+req.params.fileName+'.mp4';
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });


router.route("/getUser").get((req,res)=>{
    res.send(conn.USERS.users);
})
router.route("/regist").post( async(req,res)=>{
    const s = conn.Regist(req,res);
    console.log(s);
    
});
router.route("/login").post( async(req,res)=>{
    const s = conn.Login(req,res);
    console.log(s);
});
router.route("/logout/:token").post( async(req,res)=>{
  res.send(
    conn.Logout(req,res)
  )
});

router.route("/jwt/:token").post((req,res)=>{
    
    var userID = [];

    conn.USERS.users.map((item)=>{
        if (req.params.token == item.token) {
            userID.push(item.id) 
        }
       
    })
    if(userID.length > 1){
conn.USERS.reFreshing();
    }
    if (userID !== null) {
        res.status(200).send(userID);
    }

});





module.exports = router;