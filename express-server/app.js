const express =require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')



app.use(cors())
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);




app.listen( 4000 , () => {
    console.log('app is listening')
    mongoose.connect('mongodb+srv://mealuser:securepassword@cluster0.44dvn.mongodb.net/?retryWrites=true&w=majority' ,
        {useNewUrlParser: true, useUnifiedTopology: true},() => {
            console.log('connected to mongoose');

        })
    mongoose.connection.once('open',()=>{
        console.log('connected to database');
    })
});
