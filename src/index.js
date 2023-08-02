if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 

const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const appointmentRoute = require('./routes/appointments');
const profileRoute = require('./routes/profile');
const mensaje = require('./routes/mailer');

const bodyParser = require('body-parser');
const cors = require('cors');

 
const app = express();
require('./database');

app.set('port', process.env.PORT || 4000);

//connectDB()
//app.use(cors({origin: 'https://www.parodipablo.site'}));
//app.use(cors({origin: 'https://barbdos.netlify.app'}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());   
const PORT = process.env.PORT

app.use('/', authRoute);
app.use('/', appointmentRoute);
app.use('/', profileRoute);
app.use('/', mensaje); 




app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});