export class ProductData {
    constructor(
        public _id: string,
        public name: string,
        public image: string,
        public description: string,
        public brand: string,
        public category: string,
        public price: number,
        public countInStock: number,
        public rating: number,
        public numReviews: number) {
    }
}