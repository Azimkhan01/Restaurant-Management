const express  =require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const Router = require('./routes/LoginRoute')
const menuRouter = require('./routes/menuRoute')
require('./database/db')
require('dotenv').config();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:['GET','POST','PUT','PATCH','DELETE'],
        credentials:true
    }
));
app.use('/',Router)
app.use('/',menuRouter)
app.listen(process.env.PORT,()=>{
    console.log("The server is listening ....")
});