import { productListReducer } from "./reducers/productReducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(
    {
    reducer: {
        productList: productListReducer
    }});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;






// const reducer: Reducer = combineReducers({
//     productList: productListReducer
// });

// const initialState: Object = {};
//
// const middleware: Middleware[] = [ thunk ];
//
// const store: Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
//
// export default store;