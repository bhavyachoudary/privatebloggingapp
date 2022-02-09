import axios from 'axios';
import { MAIN_URL } from '../../config/Url';
import { GET_PRODUCTS, SHOW_ERROR_MESSAGE, START_LOADING, STOP_LOADING } from '../Constants/SearchConstants';

export const getProductsByFilter = arg => async dispatch => {
    try {
        const response = await axios.post("http://localhost:9999/api/blog/search", arg);
        console.log(response.data.products)
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products,
        });
    } catch (err) {
        console.log('getProductsByFilter api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
        });
    }
};