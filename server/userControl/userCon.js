const express = require("express")
const router = express.Router()
var jwt = require('jsonwebtoken');



class UsersCon{


    constructor(){
this.users= []
    }

    reFreshing(){
        let array = [];
        this.users.map((item)=>{
            if (item.token != null || item.active) {
                
                array.push(item);

            }
        })
        this.users = array;
    }

    freeDomAdd(user){

        

        this.users.map((item)=>{
            if (item.name === user.name && item.email === user.email) {
                 item.token = null;
                 item.active = false;
            }
        })
        
       
this.reFreshing()
    }
    logout(token){
       var bool = false;
       return this.users.map((item)=>{
            if (item.token == token) {
                bool = true
                this.freeDomAdd(item);
                this.reFreshing()
                return bool;
            }
        })
        
    }

    isUser(token){
       return this.users.map((item)=>{
            if (item.token == token) {
                return true
            }
        })
        
    }

    addUser(user){
   this.freeDomAdd(user);
        const newUser = new User(user)
        this.users.push(newUser);
        console.log("csatlakozott: "+newUser.token);
    
    this.reFreshing()
    }

}





class User{


    constructor(user){
        this.active = true
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.token = jwt.sign({ id: user.id }, 'secret');
    }
}

var userCon = new UsersCon();


module.exports = {
    router:router,
    userCon:userCon
}
