const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId


const password = 'bcowG1iLFsxBjxDU'

const uri = "mongodb+srv://organicUser:bcowG1iLFsxBjxDU@cluster0.vfsjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


// red data from my website #read from crud r
client.connect(err => {
  const collection = client.db("myFirstDatabase").collection("products");
  
  app.get('/product', (req,res)=>{
    collection.find({})
    .toArray((err , documents)=>{
      res.send(documents)
    })
  })
  //update
  app.get('/product/:id', (req , res)=>{
    collection.find({_id : ObjectId(req.params.id)})
    .toArray((err ,documents)=>{
      res.send(documents[0])
    })
  })

  // add data to database # create from crud c
  app.post("/addProduct",(req,res)=>{
    const product = req.body;
    collection.insertOne(product)
    .then(result =>{
      console.log("data is added");
      res.send('success')
    })
  })

// delete data from database #delete form crud d
app.delete('/delete/:id',(req,res)=>{
  collection.deleteOne({_id:ObjectId(req.params.id)})
  .then(result =>{
    console.log(result)
  })
})

});






app.listen(3000)
 
