import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Colors from '../Styles/Colors';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../Store/actions/comics';

import api from '../Services/api';

const CharactersScreen = (props) => {
    const [comic, setComic] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            console.log(err.message);
        }
    }, [dispatch, setIsLoading]);

    // useEffect(() => {        
    //     async function loadProviders() {
    //         setIsLoading(true)
    //         const response = await api.get('/v1/public/comics?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8');

    //         setComic(response.data.data.results);
    //         setIsLoading(false)
    //     }
    //     loadProviders();
    // }, []);
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        )
    };

    return (
        <FlatList
            data={products}
            numColumns={2}
            renderItem={(itemData) => (
                <View style={{
                    flex: 1, padding: 5, borderRadius: 4
                }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(
                        'ComicDetails',
                        {
                            comicId: itemData.item.id,
                            comicTitle: itemData.item.title
                        }
                    )}>
                        <Image
                            style={{
                                height: 150, flex: 1, borderRadius: 4
                            }}
                            autoSize
                            resizeMode="cover"
                            source={{ uri: itemData.item.image }}
                        />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.TextTitleComic}>{comic.title}</Text>
                </ View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default CharactersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    TextTitleComic: {
        width: 120,
        fontSize: 13,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})