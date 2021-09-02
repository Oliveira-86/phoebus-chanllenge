import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Trash from '../../assets/svg/Trash';
import LessRed from '../../assets/svg/LessRed';
import MoreRed from '../../assets/svg/MoreRed';

import Fonts from '../../Styles/Fonts';




const ProductCardOrder = (props) => {

    return (
        <View style={styles.container}>

            <Image source={{ uri: props.imgUrl }} style={styles.imageProduct} />

            <View style={styles.secondColumn}>

                <View style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text style={styles.title} numberOfLines={1} >
                        {props.title}
                    </Text>
                </View>


                <Text style={styles.price}>
                    R$ {props.price.toFixed(2)}
                </Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={props.onDecrease}
                    >
                        {props.quantity <= 1 &&
                            <Trash style={{ right: -13, top: 1 }} />
                        }
                        {props.quantity > 1 &&
                            <LessRed style={styles.imageDecrease} />
                        }

                    </TouchableOpacity>

                    <Text style={[
                        styles.accountLess,
                        props.quantity >= 2 && styles.accountMoreThanTwo
                    ]}
                    >
                        {props.quantity}
                    </Text>

                    <TouchableOpacity
                        onPress={props.onIncrease}
                    >
                        <MoreRed />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 120,
    },

    imageProduct: {
        width: '50%',
        height: '100%',
        borderRadius: 7,
    },

    secondColumn: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        right: 20
    },

    title: {
        fontFamily: Fonts.bold,
        color: 'white',
        fontSize: 19,
        position: 'absolute',
        left: -20
    },

    price: {
        fontFamily: Fonts.semi,
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        left: -18,
        top: 35
    },

    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 90,
        left: -30,
        top: -15
    },

    imageDecrease: {
        top: 4,
    },

    account: {
        fontFamily: Fonts.bold,
        color: 'white',
        fontSize: 14,
    },

    accountLess: {
        fontFamily: Fonts.bold,
        color: 'white',
        fontSize: 14,
        right: -8,
    },

    accountMoreThanTwo: {
        left: -4,
    }

})

export default ProductCardOrder;