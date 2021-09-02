import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Colors from '../Styles/Colors';
import Fonts from '../Styles/Fonts';

import ViewGradient from '../Components/UI/ViewGradient';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../Store/actions/comics';

const CharactersScreen = (props) => {
    const [comic, setComic] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const products = useSelector(state => state.products.availableProducts);
    const prodDefault = products.filter(prod => prod.id >= 1000);
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
        <FlatList
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', flex: 1 }}
            data={prodDefault}
            numColumns={2}
            renderItem={(itemData) => (
                <View style={{
                    flex: 1, padding: 5, borderRadius: 4
                }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(
                        'Details',
                        {
                            comicId: itemData.item.id,
                            comicTitle: itemData.item.title,
                            comicPrice: itemData.item.price
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
                    <Text numberOfLines={1} style={styles.TextTitleComic}>{itemData.item.title}</Text>
                </ View>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
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
                                'Details',
                                {
                                    comicId: itemData.item.id,
                                    comicTitle: itemData.item.title,
                                    comicPrice: itemData.item.price
                                }
                            )}>
                                <View style={styles.userContainer}>
                                    <ViewGradient
                                        style={styles.imageContainer}
                                        source={{ uri: itemData.item.image }}
                                        styleImage={styles.image}
                                        image={true}
                                    />

                                </View>
                                <ViewGradient
                                    style={styles.promoContainer}
                                    styleText={{ color: 'white', fontFamily: Fonts.bold }}
                                    text={true}
                                    title="-10%"
                                />
                            </TouchableOpacity>
                        )}

                    />
                    <View style={{ padding: 20 }}>
                        <Text style={{ color: 'white', fontFamily: Fonts.bold, fontSize: 22 }}>
                            Comics
                        </Text>
                    </View>
                </>
            )}
        />
    );
};

export const screenOptions = () => {
    return {
        headerRight: () => {
            return (
                <View>
                    <Image source={require('../assets/shield.png')}
                        style={{ width: 40, height: 40, marginRight: 20 }}
                    />
                </View>
            )
        }
    }
}

export default CharactersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    TextTitleComic: {
        width: 120,
        fontSize: 15,
        color: 'white',
        fontFamily: Fonts.bold,
        marginTop: 4,
        marginBottom: 10
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    promoContainer: {
        width: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        top: -140,
        left: 80,
        padding: 3
    }

})