import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import CarRoute from './routes/CarRoute';
import MotorcycleRoute from './routes/MotorcycleRoute';

const app = express();
app.use(express.json());
app.use('/cars', CarRoute);
app.use('/motorcycles', MotorcycleRoute);
app.use(errorHandler);

export default app;
