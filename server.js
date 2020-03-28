const express = require('express')
const parser=require('body-parser');
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors');
const app=express();
app.use(parser.json());
app.use(cors())
const database={
    users:[
            {
                id:'123',
                email:'henok@gmail.com',
                name:'henok',
                password:'passme',
                enteries:0,
                joind: new Date()

            },
            {
                id:'456',
                email:'mamen@gmail.com',
                name:'mamen',
                password:'mamen123',
                enteries:0,
                joind: new Date(),

            },
    ],
    login:[
        {
            id:'',
            hash:'',
            email:''
        }
    ]
}
app.get('/',(req,res)=>{
    res.send(database.users);
})
app.post ('/signin',(req,res)=>{
    bcrypt.compare('otw','$2a$10$uJ.e5ix0zTUGmAyNBxIM3.jj9O/Sp7kPRI.P6.nfwu75nAV5G.iLO',function(err,res){
      console.log('first guss',res)
    })
    bcrypt.compare('notw','$2a$10$uJ.e5ix0zTUGmAyNBxIM3.jj9O/Sp7kPRI.P6.nfwu75nAV5G.iLO',function(err,res){
        console.log('second guss',res)
    })

    if(req.body.email=== database.users[1].email&&req.body.password===database.users[1].password){
        res.json('wellcome'+database.users[1].name);
    }
    else{
        res.status(400).json('error loging in');
    }

})
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;
    bcrypt.hash(password,null,null,function(err,hash){
        console.log(hash);
    })
   database.users.push({
    id:'789',
    email:email,
    name:name,
    password:password,
    enteries:0,
    joind: new Date(),

   })
   res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
    let found=false;
    const {id}=req.params;
        database.users.forEach(user=>{
            if(user.id===id)
            {
                found=true;
               return res.json(user);
            }
        }
                
        )
        if (!found){
            res.status(404).json('usere not found');
        }
    
})

app.put('/image' ,(req,res)=>{
    
    let found=false;
    const {id}=req.body;
        database.users.forEach(user=>{
            if(user.id===id)
            {
                found=true;
                user.enteries++;
               return res.json(user.enteries);
            }
        }
                
        )
        if (!found){
            res.status(404).json('usere not found');
        }
    
})

app.listen(3000,()=>{
    console.log("listning to port 3000");
})