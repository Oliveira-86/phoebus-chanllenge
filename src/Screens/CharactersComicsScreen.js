import React from 'react';
import { useSelector } from 'react-redux';
import { CHARACTERS } from '../Data/dummy-data';

import ComicsList from '../Components/Shop/ComicsList';

const CharactersComicsScreen = (props) => {

    const chatId = props.route.params.charactersId;

    const availableMeals = useSelector(state => state.comics.filteredMeals);

    const displayedMeals = availableMeals.filter(
        (meal) => meal.categoryIds.indexOf(chatId) >= 0
    );

    return <ComicsList listData={displayedMeals} navigation={props.navigation} />
};

export const screenOptions = (navData) => {
    const catId = navData.route.params.charactersId;

    const selectedCategory = CHARACTERS.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,        
    }
};

export default CharactersComicsScreen;