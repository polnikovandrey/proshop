export class ProductData {

    public _id: string

    constructor(
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