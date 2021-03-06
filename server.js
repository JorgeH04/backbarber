if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 
const mongoose = require('mongoose');

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const authRoute = require('./routes/auth');
const appointmentRoute = require('./routes/appointment');
const profileRoute = require('./routes/profile');

const bodyParser = require('body-parser');
const cors = require('cors');

//dotenv.config({ path:'./config/config.env' })

const app = express();
require('./database');

app.set('port', process.env.PORT || 3000);

connectDB()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // if req.body is undifined need to add this middleware!
app.use(express.json());  // if req.body is empty need to add this middleware!
const PORT = process.env.PORT

app.use('/', authRoute);
app.use('/', appointmentRoute);
app.use('/', profileRoute);

// app.listen( PORT || 5000, () =>
//   console.log(`Server has started on port:${PORT}`)
// );

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});