import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer from '../Redux/Reducer/SearchReducer'

const reducer = combineReducers({
    products: productReducer,

});
const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;