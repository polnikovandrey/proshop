import { applyMiddleware, combineReducers, createStore, Middleware, Reducer, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer: Reducer = combineReducers({});

const initialState: Object = {};

const middleware: Middleware[] = [ thunk ];

const store: Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;