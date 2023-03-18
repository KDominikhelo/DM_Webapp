const express =require("express");
const router = express.Router();
const mysql = require("mysql");
const userCon = require("../userControl/userCon");
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: true }));
const USERS = userCon.userCon;
const connection  =mysql.createConnection({
    user:"Martin",
    password:"12345",
    host:"localhost",
    database:"staticquestion"
})
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
  });

  async function Login(req,res) {
    await connection.query('CALL login(?,?)',[req.body.name,req.body.pass], function (error, results, fields) {
         if (error) {
             return error
         } else {
            USERS.addUser(results[0][0])
            console.log(results[0][0]) ;
             res.send({token:USERS.users[USERS.users.length-1].token , name : results[0][0].name,email :results[0][0].email}) ;
             return results
         }
         
     });
 }
 async function Regist(req,res) {
    await connection.query('CALL regist(?,?,?)',[req.body.name,req.body.pass,req.body.email], function (error, results, fields) {

         if (error) {
             return error
         } else {
            console.log(results ,req.body );
             res.send(results) ;
             return results
         }
         
     });
 }
 function Logout(req,res) {
    //req.params.token
  return USERS.logout(req.params.token);
 }


module.exports = {

    router:router,
    Login:Login,
    Regist:Regist,
    Logout:Logout,
    USERS:USERS


}