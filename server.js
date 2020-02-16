const express=require('express');
const bodyParse=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const register=require('./controller/register')
const signin=require('./signin/signin')
const profile=require('./profile/profile')
const image=require('./image/image')
const cors=require('cors');
var knex = require('knex')

const postgres=knex({
    client:  'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
        ssl:true,
    }
  });



const app=express();

app.use(bodyParse.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send('it is working');
    
})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres)})

app.put('/image',(req,res)=>{
    image.handleImage(req,res,postgres)
})

app.post('/imageurl',(req,res)=>{
    image.handleApi(req,res)
})

app.post('/signin',(req,res)=>{
    signin.handleSignin(req,res,postgres,bcrypt)
})

app.post('/register',(req,res)=>{
    register.handleRegister(req,res,postgres,bcrypt)
})


app.listen(process.env.PORT ||3000,()=>{
console.log(`running at ${process.env.PORT}`);

})
