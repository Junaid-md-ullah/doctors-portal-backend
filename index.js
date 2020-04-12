const express = require('express')
const app = express();
const cors=require('cors');
app.use(cors());
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json())
const port=4200;
const dbUser='dbUser';
const uri = "mongodb+srv://dbUser:DCKephY8SnhN60aP@cluster0-zzeuc.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true });

//database connection











// app.post('/addDepartments',(req,res)=>{
//     const departments=req.body;
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("doctors-portal").collection("departments");
//         // perform actions on the collection object
//         collection.insert(departments,(err,res)=>{
//             console.log('successfully inserted')    
//         })
        
//         client.close();
//       });

// });

app.post('/addAppointment',(req,res)=>{
    const departments=req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctors-portal").collection("appointmentList");
        // perform actions on the collection object
        collection.insert(departments,(err,res)=>{
            console.log('successfully inserted')    
        })
        
        client.close();
      });

});

app.get('/departs',(req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("doctors-portal").collection("departments");
      
        collection.find().toArray((err,documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents)
            }
        })
        
        client.close();
      });
})

app.get('/appointments',(req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("doctors-portal").collection("appointmentList");
      
        collection.find().toArray((err,documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents)
            }
        })
        
        client.close();
      });
})

// app.get('/appointmentsFilter',(req,res)=>{
//     client = new MongoClient(uri, { useNewUrlParser: true});
//     client.connect(err => {
//         const collection = client.db("doctors-portal").collection("appointmentList");
      
//         collection.find({$Date:$fullDate}).toArray((err,documents)=>{
//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(documents)
//             }
//         })
        
//         client.close();
//       });
// })

app.listen(port,()=>console.log('listening to port 3000'));