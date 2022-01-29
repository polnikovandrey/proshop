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
export type CartItem = { productId: string, name: string, image: string, price: number, countInStock: number, quantity: number };
export type UserInfo = { _id: string, name: string, email: string, admin: boolean, token: string };
export type UserProfile = { name: string, email: string, password?: string };
export type ShippingAddress = { address: string, city: string, postalCode: string, country: string };
export type CartState = { items: CartItem[], shippingAddress: ShippingAddress, paymentMethod: string };
export type Order = CartState & { _id?: string, itemsPrice: number, shippingPrice: number, taxPrice: number, totalPrice: number };
export type OrderState = { loading?: boolean, order?: Order, error?: string };
export type OrderDetail = Order & { user: UserInfo, paid: boolean, paidAt: Date, delivered: boolean, deliveredAt: Date }
export type OrderDetailState = { loading?: boolean, order?: OrderDetail, error?: string }
export type OrderListState = { loading?: boolean, orders?: OrderDetail[], error?: string }
export type OrderPayState = { loading?: boolean, success?: boolean, error?: string }
export type ProductsListState = { loading: boolean, items?: ProductItem[], error?: string };
export type ProductsDetailsState = { loading: boolean, item?: ProductItem, error?: string };
export type UserState = { loading?: boolean, user?: UserInfo, error?: string }
export type UserProfileState = { loading?: boolean, success?: boolean, user?: UserProfile, error?: string }

export const numberToPriceString: (num: number) => string = num => (Math.round(num * 100) / 100).toFixed(2);
export const numberToPrice: (num: number) => number = num => Number(numberToPriceString(num));