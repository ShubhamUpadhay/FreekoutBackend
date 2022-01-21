const express = require("express");
const cors = require('cors')
const app = express();
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var path = require('path');
const { prototype } = require("events");
app.use(cors())
const port=process.env.PORT || 8000;
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())



const dbURI = `mongodb+srv://Shubham:mahbuhs@cluster0.mnc24.mongodb.net/BrandQuries?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(dbURI,options).then(()=>{
    console.log("database connected")
})
const BrandSchema = new mongoose.Schema({},{strict:false})
var Queries = mongoose.model('BrandQuries',BrandSchema)

app.post('/query', async (req, res) => {
    console.log('abcd', req.body)
    var queries = new Queries({
        brandName: req.body.brandName,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        instagramID: req.body.instagramID,
        message: req.body.message
    })
    var data = await queries.save()
    res.send("Added")
})

app.get('/getQueryList',async(req,res)=>{
    var data = await Queries.find()
    res.send(data)
})

app.listen(port,()=>{
    console.log('server started')
})