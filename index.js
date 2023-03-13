const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const { User } = require("./models/User");

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURL,
{useNewUrlParser : true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('다 울었니,, 해야할일을하자!!')
})

app.post('/register',async (req, res) => {
  //회원 가입할 때 필요한 정보들을 Client에서 가져오면
  //그것들은 DB에 넣어줌


    //body parser통해 body에 담긴 정보를 가져온다
    const user = new User(req.body)

    const result = await user.save().then(()=>{
      res.status(200).json({
        succes : true
      })
     }).catch((err)=>{
      res.json({success:false,err})
     }) 


    
    })




app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))