import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CHARACTERS } from '../Data/dummy-data';

import ComicsList from '../Components/Shop/ComicsList';

const CharactersComicsScreen = (props) => {
    const [data, setData] = useState([]);

    const { hero } = props.route.params;
    

    // const getProduct = useCallback(async () => {
    //     const timestamp = '1630369223';
    //     const apiKey = '262230a137f1280720e8001c1e9e98ff';
    //     const md5 = 'e1b663a6c6562bf009f148c3aae7bd87';

    //     try {
    //         const response = await fetch(
    //             `http://gateway.marvel.com/v1/public/characters/${chatId}?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=10`
    //         )
    //         const responseJson = await response.json();
    //         setData(responseJson.data.results);
    //     } catch (error) {
    //         console.error(error);
    //     }

    // }, []);
    // useEffect(() => {
    //     getProduct();
    // }, [getProduct])

    // const comics = data.filter(
    //     (data) => data.items 
    // )
    // console.log("REVISTASSS", comics)

    // const displayedMeals = response.filter(
    //     (meal) => meal.comics.items.indexOf(chatId) >= 0
    // );

    return <ComicsList listData={hero} navigation={props.navigation} />
};

// export const screenOptions = (navData) => {
//     const catId = navData.route.params.charactersId;
//     const dataId = 

//     const selectedCategory = CHARACTERS.find((cat) => cat.id === catId);

//     return {
//         headerTitle: selectedCategory.name,        
//     }
// };

export default CharactersComicsScreen;