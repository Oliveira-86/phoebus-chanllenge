import Characters from "../../Models/Characters";
import api from "../../Services/api";

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        const response = await api.get('/v1/public/comics?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8');
        const resdata = response.data.data.results

        const loadedProducts = [];
        for (const key in resdata) {
            loadedProducts.push(new Characters(
               resdata[key].id,
               resdata[key].title,
               resdata[key].thumbnail.path+'.jpg'
            ))
        }
        console.log("Load PRODUCTSSSSS", loadedProducts)
        dispatch({ type: SET_PRODUCTS, products: loadedProducts })      
    }

};

export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        mealId: id
    };
};

export const setFilters = filterSettings => {
    return {
        type: TOGGLE_FAVORITE,
        filters: filterSettings
    };
};