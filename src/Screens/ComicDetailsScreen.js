import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text, View,
    TouchableOpacity,
    Image, ScrollView,
    ImageBackground, ActivityIndicator
} from 'react-native';

import Fonts from '../Styles/Fonts';

import api from '../Services/api';

const imagemFundo = 'https://raw.githubusercontent.com/AlissonMacedo/AppMarvel-ListHQs-React-Native/master/src/assets/fundo-vingadores.jpg'

const ComicDetails = ({ route, navigation }) => {
    const [comic, setComic] = useState([]);
    const hero = route.params.comicId;
    const prices = route.params.comicPrice;
    const [loading, setLoading] = useState(true);

    const price = prices.map(pro => pro.price)

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
            source={{ uri: imagemFundo }}
            style={{ width: '100%', height: '100%' }}
        >
            <View style={styles.container}>
                {loading ? (<ActivityIndicator size="large" style={{ marginTop: 300 }} color="#FFF" />) : (
                    <ScrollView style={styles.ViewTotal}>
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
                                    style={{ color: '#FFF', fontSize: 18, fontFamily: Fonts.bold }}
                                >
                                    $ {price[0]}
                                </Text>
                            </View>

                        </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    header: {
        height: 90,
        backgroundColor: '#202020',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#707070',
        borderLeftColor: '#202020',
        borderRightColor: '#202020',
        borderTopColor: '#202020',
        borderStyle: 'solid',
        borderWidth: 2,

    },
    marvelLogo: {
        marginTop: 25,
        height: 40,
    },
    ViewTotal: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 20
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
    }

});

export default ComicDetails
