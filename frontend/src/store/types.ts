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
export type UserInfo = { };

export type CartState = { items: CartItem[] };
export type ProductsListState = { loading: boolean, items?: ProductItem[], error?: string };
export type ProductsDetailsState = { loading: boolean, item?: ProductItem, error?: string };
export type UserState = { loading?: boolean, user?: UserInfo, error?: string }
