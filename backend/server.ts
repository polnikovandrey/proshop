import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectDb } from "./config/db.js";
import { products } from './data/products.js';
import { ProductData } from './data/ProductData.js';

dotenv.config();

connectDb();

const app: Express = express();

app.get('/', (request, response) => {
    response.send('API running...');
});

app.get('/api/product', (request, response) => {
    response.json(products);
});

app.get('/api/product/:id', (request, response) => {
    const product: ProductData = products.find((value: ProductData) => value._id === request.params.id);
    response.json(product);
});

const port: number = parseInt(process.env.PORT, 10);
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));