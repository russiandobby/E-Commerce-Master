const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const  path  = require('path');
const compression = require('compression');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

// bring stripe libary after above line so it will have acess to secret key
// stripe gives back a func swe invoke it with secret key
// then we will get the stripe object
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// start new express application
const app = express();
const port = process.env.PORT || 5000;


app.use(compression());
// any request coming in process body and convert to json
app.use(bodyParser.json());
// make sure url string we get and send are correct
app.use(bodyParser.urlencoded({extended:true}));
// make sure origin is the same/properly make requests
app.use(cors());
// serve a certain file within the path we pass
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    // from any url
    // for any routes that is not covered by  routes we write we want to do this as response
    // all our front end code will end up in index.html
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    });
}
app.listen(port,error=>{
    if(error)throw console.error;
    console.log('Server i running on port ' + port);
});


app.post('/payment',(req,res)=>{
    // req holds data from front side that we want to send
    // res holds our response
    // what we will pass to stripe/token
    const body ={
        // req has a body parameter
        source: req.body.token.id,
        amount: req.body.amount,
        currency:'usd'
    };
    // make stripe charge and see how stripe responds
    stripe.charges.create(body, (stripeErr,stripeRes) =>{
        if(stripeErr){
            res.status(500).send({error:stripeErr})
        }else{
            res.status(200).send({error:stripeRes})
        }
    });
});