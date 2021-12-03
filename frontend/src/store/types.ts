export type ProductItem = {
    _id: string,
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number };
export type ProductRatingItem = { rating: number, numReviews: number };
export type CartItem = { productId: string, name: string, image: string, price: number, countInStock: number, qty: number };

export type CartState = { cartItems: CartItem[] };
export type ProductsListState = { loading?: boolean, payload?: ProductItem[], error?: string };
export type ProductsDetailsState = { loading?: boolean, payload?: ProductItem, error?: string };
