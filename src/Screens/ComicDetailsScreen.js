import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text, View,
    TouchableOpacity,
    Image, ScrollView,
    ImageBackground, ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../Store/actions/cart';
import { FontAwesome } from '@expo/vector-icons';

import Fonts from '../Styles/Fonts';
import Colors from '../Styles/Colors';

import api from '../Services/api';
import ButtonGradient from '../Components/UI/ButtonGradient';

const bgImage = 'https://raw.githubusercontent.com/AlissonMacedo/AppMarvel-ListHQs-React-Native/master/src/assets/fundo-vingadores.jpg'

const ComicDetails = ({ route, navigation }) => {
    const [comic, setComic] = useState([]);
    const hero = route.params.comicId;
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const selectedComic = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === hero)
    );

    useEffect(() => {
        async function loadComic() {
            const response = await api.get(
                `/v1/public/comics/${hero}?ts=1&apikey=17dd4b8faf0f00eeeb6633eaaf7774bc&hash=44d49ea637270c4b188070acb9d4abb8`
            );
            setComic(response.data.data.results);
            setLoading(false);
        }
        loadComic();
    }, []);



    return (
        <ImageBackground
            source={{ uri: bgImage }}
            style={{ width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                {loading ? (<ActivityIndicator size="large" style={{ marginTop: 300 }} color="#FFF" />) : (
                    <ScrollView style={styles.ViewTotal}>
                        <Text numberOfLines={1} style={styles.TextTitle}>{selectedComic.title}</ Text>
                        <View style={styles.ViewImageInfo}>
                            {comic.map(provider => (
                                <Image
                                    key={provider.id}
                                    style={{
                                        flex: 1,
                                        width: 230,
                                        height: 310,
                                        margin: 30,
                                    }}
                                    autoSize
                                    resizeMode="contain"
                                    source={{ uri: provider.thumbnail.path + '.jpg' }}
                                />
                            ))}
                            <View style={styles.ViewTextInfo}>
                                <Text style={styles.TextTitle2}>Price:</ Text>
                                <Text
                                    style={{ color: '#FFF', fontSize: 22, fontFamily: Fonts.bold }}
                                >
                                    $ {selectedComic.price.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                        <ButtonGradient
                            style={styles.buttonConainer}
                            textStyle={{ fontSize: 18 }}
                            text="Add To Cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(selectedComic));
                            }}
                        />
                        <View style={styles.ViewTextDescription}>
                            {comic.map(provider => (
                                <Text key={provider.description} style={styles.TextDescription}>{provider.description}</ Text>
                            ))}
                        </View>


                    </ ScrollView>
                )}
            </View>
        </ImageBackground>
    );
}

export const screenOptions = ({ navigation }) => {
    return {
        headerRight: () => {
            const currentQuantity = useSelector(state => state.cart.totalQuantity);
            return (
                <>
                    
                    <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <FontAwesome name="shopping-cart" size={24} color="white" />
                        {currentQuantity !== 0 && <View style={styles.dot} />}
                    </TouchableOpacity>
                    
                </>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    marvelLogo: {
        marginTop: 25,
        height: 40,
    },
    ViewTotal: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    TextTitle: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold',
    },
    TextTitle2: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    },
    ViewImageInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    ViewTextInfo: {
        width: 80,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    TextoDescricao: {
        fontSize: 13,
        color: '#FFF',
    },
    ViewTextDescription: {
        flex: 1
    },
    TextDescription: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 10,
    },

    buttonConainer: {
        width: '100%',
        marginVertical: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dot: {
        backgroundColor: '#28FF00',
        width: 15,
        height: 15,
        borderRadius: 8,
        position: 'absolute',
        right: -3,
        top: -7,
        borderWidth: 2,
        borderColor: Colors.primaryColor
    }

});

export default ComicDetails
