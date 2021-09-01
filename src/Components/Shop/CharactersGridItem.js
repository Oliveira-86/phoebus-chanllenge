import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native';

import Fonts from '../../Styles/Fonts'

const CategoryGridTile = (props) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>

            <TouchableCmp
                elevation={0.8}
                onPress={props.onSelected}
                style={{ flex: 1 }}
            >
                <ImageBackground
                    style={styles.container}
                    source={{ uri: props.image }}

                >

                <Text style={styles.title} numberOfLines={2}>
                    {props.name}
                </Text>
                    
            </ImageBackground>
                </TouchableCmp>
        </View >
    );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        width: 175,
        height: 150,
        margin: 10,


    },

    container: {
        flex: 1,
        padding: 15,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },

        elevation: 10,

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    title: {
        fontFamily: Fonts.bold,
        fontSize: 22,
        textAlign: 'right'
    }
});