import dotenv from 'dotenv';
import express, { Express } from 'express';
import connectDb from "./config/db.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

connectDb().then();

const app: Express = express();

app.use('/api/product', productRouter);

app.get('/', (request, response) => {
    response.send('API running...');
});

const port: number = parseInt(process.env.PORT, 10);
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));