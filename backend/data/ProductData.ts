import { ObjectId } from "mongoose";

export class ProductData {

    public _id: string;
    public user: ObjectId;

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