import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CharactersGridItem from '../Components/Shop/CharactersGridItem';

import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../Store/actions/comics';

import { CHARACTERS } from '../Data/dummy-data.js';

const CharactersScreen = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);
    console.log("PRODUTO", products)
    useEffect(() => {
        dispatch(productActions.fetchProducts());
    }, [dispatch])

    const renderGridItem = (itemData) => {
        return <CharactersGridItem
            image={itemData.item.image}
            name={itemData.item.name}
            onSelected={() => {
                props.navigation.navigate('CharactersComics', {
                    charactersId: itemData.item.id
                })
            }}
        />
    }

    return (
        <FlatList
            data={products}
            numColumns={2}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
        />
    );
};

export default CharactersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});