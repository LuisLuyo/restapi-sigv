import express, { Application } from 'express';
import './utils/config'
import indexRoutes from './routes/index';

const app: Application = express();

// Routes
app.use(indexRoutes);
// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

export default app;