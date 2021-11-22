import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { ProductData } from "../data/ProductData";
import { Action } from "redux";

export class ProductAction implements Action {

    constructor(
        public type: string,
        public payload?: ProductData[],
        public error?: string
    ) {
    }

    static createProductListRequestAction(): ProductAction {
        return new ProductAction(PRODUCT_LIST_REQUEST);
    }

    static createProductListSuccessAction(products: ProductData[]): ProductAction {
        return new ProductAction(PRODUCT_LIST_SUCCESS, products)
    }

    static createProductListFailAction(error: string): ProductAction {
        return new ProductAction(PRODUCT_LIST_FAIL, [], error);
    }
}