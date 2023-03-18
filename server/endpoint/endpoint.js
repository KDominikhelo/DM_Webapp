const express = require("express")
const router = express.Router();
const conn = require("../conn/conn");

router.use(conn.router);
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


// Routes
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