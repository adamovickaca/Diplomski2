import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js';
import cenaRoute from './routes/cenaUslugeRoutes.js';
import delatnostRoute from './routes/delatnostRoute.js';
import korisnikRoute from './routes/korisnikRoute.js';
import majstorRoute from './routes/majstorRoute.js';
import poddelatnostRoute from './routes/poddelatnostRoute.js';
import recenzijaRoute from './routes/recenzijaRoutes.js';
import rezervacijaRoute from './routes/rezervacijaRoutes.js';

//ucitava konfiguraciju iz .env datoteke
dotenv.config();

//kreira instancu express aplikacije
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send("api is working")
})

const MONGO_URL = 'mongodb://localhost:27017/majstoriapp';
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v2/auth', authRoute);
app.use('/api/v2/admin', adminRoute);
app.use('/api/v2/usluge', cenaRoute);
app.use('/api/v2/delatnosti', delatnostRoute);
app.use('/api/v2/korisnik', korisnikRoute);
app.use('/api/v2/majstori', majstorRoute);
app.use('/api/v2/poddelatnosti', poddelatnostRoute);
app.use('/api/v2/recenzije', recenzijaRoute);
app.use('/api/v2/rezervacije', rezervacijaRoute);

//Pokreće server i sluša zahteve na određenom portu
app.listen(port, ()=>{
    console.log("server is running on port" + port);
})