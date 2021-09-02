import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ViewGradient from '../UI/ViewGradient';
import * as productsActions from '../../Store/actions/comics';

import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';

const Headers = (props) => {
    console.log("PROPSSSS", props)
    const [comic, setComic] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const products = useSelector(state => state.products.availableProducts);
    const prodPromo = products.filter(prod => prod.id <= 1000);

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            console.log(err.message);
        }
    }, [dispatch, setIsLoading]);

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
        <>
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'white', fontFamily: Fonts.bold, fontSize: 22 }}>
                    Comics Deals
                </Text>
            </View>
            <FlatList
                data={prodPromo}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(itemData) => (
                    <TouchableOpacity onPress={() => props.navigation.navigate(
                        props.route,
                        {
                            comicId: itemData.item.id,
                            comicTitle: itemData.item.title,
                            comicPrice: itemData.item.price - 0.5
                        }
                    )}>
                        <View style={styles.userContainer}>
                            <ViewGradient
                                style={styles.imageContainer}
                                source={{ uri: itemData.item.image }}
                                styleImage={styles.image}
                            />
                        </View>
                    </TouchableOpacity>
                )}

            />
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'white', fontFamily: Fonts.bold, fontSize: 22 }}>
                    Comics
                </Text>
            </View>
        </>
    );
};

export default Headers;

const styles = StyleSheet.create({
    userContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
        top: -20
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 104,
        height: 104,
        borderRadius: 50,
        marginTop: 37
    },

    image: {
        width: 97,
        height: 97,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white'
    },
});
