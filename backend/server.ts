import express, { Express } from 'express';
import { products } from './data/products';
import { ProductData } from "./data/ProductData";

const app: Express = express();

app.get('/', (request, response) => {
    response.send('API running...');
});

app.get('/api/product', (request, response) => {
    response.json(products);
});

app.get('/api/product/:id', (request, response) => {
    const product: ProductData = products.find((value : ProductData) => value._id === request.params.id);
    response.json(product);
});

const port: number = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
