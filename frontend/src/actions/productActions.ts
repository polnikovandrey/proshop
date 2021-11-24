import { ProductData } from "../data/ProductData";
import { Action } from "redux";

export class ProductAction implements Action {

    constructor(
        public type: string,
        public payload: ProductData[],
        public error: string
    ) { }
}