import express, { json } from 'express'; 
require('dotenv').config();
import cors from 'cors';
import { connect } from 'mongoose';
const app = express();
import { json as _json } from 'body-parser'; 
import Auth from './routes/auth.js';
import waitingRoutes from './routes/watingRoute.js';

// middlewares 
app.use(json()); 
app.use(_json());
app.use(cors()); 

// database connection. 
connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// use method. 
app.use('/auth', Auth);
app.use('/waiting', waitingRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));