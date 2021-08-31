import React, { useLayoutEffect, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import Fonts from '../Styles/Fonts';
import Colors from '../Styles/Colors';

import { useSelector, useDispatch } from 'react-redux';

import DefaultText from '../Components/UI/DefaultText';
// import { toggleFavorite } from '../store/actions/meals';

import HeaderButton from '../Components/UI/HeaderButton';

const ListItem = (props) => {

    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};


const ComicDetailsScreen = (props) => {

    const availableMeals = useSelector(state => state.comics.meals);
    const mealId = props.route.params.mealId;
    const currentMealsFav = useSelector(state =>
        state.comics.favoriteMeals.some(meal => meal.id === mealId)
    );

    const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
         headerRight: () => {
            const isFavorite = props.route.params.isFav;    
                return (
                    <HeaderButton
                        name={isFavorite ? 'ios-star' : 'ios-star-outline'}
                        size={28}
                        onPress={toggleFavoriteHandler}
                    />
                );
            },
            headerTintColor: Colors.primaryColor,
        });
    }, [toggleFavoriteHandler]);


    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealsFav });
    }, [currentMealsFav])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <Image
                style={styles.image}
                source={{ uri: selectedMeal.imageUrl }}
            />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((steps) => (
                <ListItem key={steps}>{steps}</ListItem>
            ))}

        </ScrollView>
    );
};

export default ComicDetailsScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },

    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },

    title: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        textAlign: 'center'
    },

    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        padding: 12,
        borderRadius: 20,
    }
});