import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from "morgan";
import connectDb from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import path from "path";

dotenv.config();

connectDb().then();

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());            // Parse a json POST requests body.

app.use('/api/product', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFoundHandler);

app.use(errorHandler);

app.get('/', (request, response) => {
    response.send('API running...');
});

const port: number = parseInt(process.env.PORT, 10);
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));