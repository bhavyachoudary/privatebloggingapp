import { GET_PRODUCTS } from "../Constants/SearchConstants";

const INITIAL_STATE = {
    products: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                products: [...action.payload],
            }

        default:
            return state;
    }
};

export default searchReducer;
