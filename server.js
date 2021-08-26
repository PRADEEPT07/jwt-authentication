require('dotenv').config({path:"./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Connecting to MongoDB
connectDB();

const app = express();

app.use(express.json());

//Routes || Paths
app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/private'));

//Error Handler Should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,() => console.log(`Server running on port ${PORT}`));


//To Display UnhandledRejection Smaller 
process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1));
})