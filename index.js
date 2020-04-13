const express = require('express')
const app = express();
const cors=require('cors');
app.use(cors());
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const ObjectId =  require('mongodb').ObjectId;
app.use(bodyParser.json());
const uri = process.env.DB_PATH;
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
app.post('/updateStatus',(req,res)=>{
    const update=req.body;
    console.log(update);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctors-portal").collection("appointmentList");
        // perform actions on the collection object
        collection.updateOne(
            {_id:ObjectId(update.id)},
            {
                $set: {"status":update.status}
               
        },
        (err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(result);
                console.log(result)
            
        }
        
        client.close();
      });
    })
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
const port=process.env.PORT || 4200;
app.listen(port,()=>console.log('listening to port 3000'));