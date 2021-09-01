import React, { useCallback, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import ComicItem from './ComicItem';

const ComicsList = (props) => {

    // const getProduct = useCallback(async () => {
    //     const timestamp = '1630369223';
    //     const apiKey = '262230a137f1280720e8001c1e9e98ff';
    //     const md5 = 'e1b663a6c6562bf009f148c3aae7bd87';

    //     try {
    //         const response = await fetch(
    //             `http://gateway.marvel.com/v1/public/characters/?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=10`
    //         )
    //         const responseJson = await response.json();
    //         setData(responseJson.data.results);
    //         console.log("RESPONTA ID", responseJson)
    //     } catch (error) {
    //         console.error(error);
    //     }

    // }, []);
    // useEffect(() => {
    //     getProduct();
    // }, [getProduct])

    const renderMealItem = (itemData) => {
        // const isFavorite = favoriteComics.some(comic => comic.id === itemData.item.id);

        return (
            <ComicItem 
                title={itemData.item.name}
                // duration={itemData.item.duration} 
                // complexity={itemData.item.complexity}
                // affordability={itemData.item.affordability}
                image={`${itemData.item.thumbnail.path}.${itemData.item.thumbnail.extension}`} 
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