import Characters from "../../Models/Characters";

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        const timestamp = '1630369223';
        const apiKey = '262230a137f1280720e8001c1e9e98ff';
        const md5 = 'e1b663a6c6562bf009f148c3aae7bd87';

       const response = await fetch(
           `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=5`
       );

       const resData = await response.json();
       const loadedProducts = [];

       for (const key in resData) {
           loadedProducts.push(
               new Characters(
                   key.data.results.find(res => res.comics.id),
                   resData[key],
                   'white'
                //    resData[key].data.results[key].thumbnail.path + '.' + resData[key].data.results[key].thumbnail.extension
               )
           );
           console.log("Load PRODUCTSSSSS", loadedProducts)
       }
       
       dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    };
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