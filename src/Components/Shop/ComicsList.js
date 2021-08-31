import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import ComicItem from './ComicItem';

const ComicsList = (props) => {

    const favoriteComics = useSelector(state => state.comics.favoriteMeals);

    const renderMealItem = (itemData) => {
        const isFavorite = favoriteComics.some(comic => comic.id === itemData.item.id);

        return (
            <ComicItem 
                title={itemData.item.title}
                duration={itemData.item.duration} 
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl} 
                onSelectMeal={() => {
                    props.navigation.navigate('ComicDetails', {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite
                    })
                }}
            />
        )
    };

    return (
        <View style={styles.container}>
           <FlatList 
                data={props.listData}
                keyExtractor={(item, _) => String(item.id)}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
           />
        </View>
    )
}

export default ComicsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
})