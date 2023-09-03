const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors")
require("dotenv").config();
 const app = express();
 app.use(express.json());
app.use(cors({
    origin : "*"
}))
 const{TaskModel} =require("./module/taskmodule")
 const {connection} = require("./config/db")
 const {UserModel} = require("./module/user.module");
const { config } = require("dotenv");

console.log(connection, UserModel);
 
const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send({ msg : "base epi endpoint"})
})


// authentication at here---------------------------------------------------------
const authentication = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.send("log in first")
    }
    else{
        jwt.verify(token, "mandeep",function(err,decode){
                 if(err){
                    res.send("login first")
                 }
                 else{
                  const {userID} = decode;
                  req.userID= userID;
                    next()
                 }
        })
    }
}
// authorization at here------------------------------------

const aothorisation = (permittedRole)=>{
    return async (req,res, next)=>{
            const userID = req.userID;
            const user = await UserModel.findOne({_id : userID})
            const role = user.role
            if(permittedRole.includes(role)){
                next()
            }else{
                res.send("not authorised")
            }
}
}

//singup at here-------------------------------

app.post("/signup", async(req,res)=>{
try{
    const {email, password, name}= req.body;
    bcrypt.hash(password, 4, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.send({msg : "some worong gose, please recheck"})
        }
        const data = await UserModel.create({
            email,
            password : hash,
            name
        })
        res.send(data);
    }
    );
}catch(err){
    res.send({msg : "something gose wrong"})
}
})
//login post request at here--------------------------

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const isuser =await UserModel.findOne({email});
    if(isuser){
        const userPassword = isuser.password;
        bcrypt.compare(password, userPassword, function(err, result) {
            if(result){
                const token = jwt.sign({userID: isuser._id}, "mandeep")
                res.send({ msg :"login successfull", token : token} );
                
            }
            else{
                res.send("login faild")
            }
        });
    }
})


app.get("/feedback", authentication ,aothorisation(["student"]), (req,res)=>{
    res.send("feedback at here bro")
})
// get task form the db ------------------------
app.get("/tasks",authentication, async(req,res)=>{
    try{

        const tasks = await TaskModel.find();
        res.send(tasks)
    }catch(err){
         res.send({msg : "something went wrong"})
    }
})

// add a task------------------
app.post("/task/add", authentication,async (req, res) => {
    const {title, status, category} = req.body;
    const userID = req.userID
    const new_task = new TaskModel({
        title,
        status,
        category,
        user_id : userID
    })
    try{
        await new_task.save()
        return res.send({msg : "task successfully added"})
    }
    catch(err){
        console.log(err)
        res.send({msg : "something went wrong"})
    }
})


app.delete("/task/:taskID", authentication, async (req, res) => {
    const { taskID } = req.params;
    const { userID } = req; // Access the userID from the request object
  
    try {
      const tasks = await TaskModel.findOneAndDelete({ _id: taskID, user_id: userID });
  
      if (tasks) {
        res.send({ msg: 'Task deleted successfully' });
      } else {
        res.status(404).send({ msg: 'Task not found or unauthorized' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Internal server error' });
    }
  });
  


app.put("/task/:taskID",authentication, async(req,res)=>{
    const taskEdit = await TaskModel.findOneAndUpdate({_id : req.params.taskID
    },req.body,{new:true})
    res.send({msg : "task edit done", task : taskEdit})
});


 app.listen(8000, async()=>{
    try{

        await connection();
      

    } catch(err){
        console.log("DB not connected")
    }   
    console.log("server 8000 is runnig");

 })