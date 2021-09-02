import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../Store/actions/cart';

import Card from '../Components/UI/Card';
import Colors from '../Styles/Colors';
import Fonts from '../Styles/Fonts';

import CartItem from '../Components/Shop/CardCartItem';

import { Ionicons } from '@expo/vector-icons';
import ButtonGradient from '../Components/UI/ButtonGradient';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productImage: state.cart.items[key].image,
                productPrice: state.cart.items[key].price,
                productTitle: state.cart.items[key].title,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                totalQty: state.cart.items[key].totalQty
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    return (
        <View style={styles.container}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:  <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ?
                    <ActivityIndicator
                        style={{ paddingRight: 10 }}
                        size='small'
                        color={Colors.primaryColor}
                    /> : (
                        <ButtonGradient
                            text="Order Now"
                            style={{ padding: 10, borderRadius: 5 }}
                            textStyle={{ fontSize: 14 }}
                            disable={cartItems.length === 0}
                        />
                    )}
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <Card style={styles.summary}>
                        <CartItem
                            price={itemData.item.productPrice}
                            imgUrl={itemData.item.productImage}
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onIncrease={() => {
                                dispatch(cartActions.increaseQuantity(itemData.item.productId))
                            }}
                            onDecrease={() => {

                                if (itemData.item.quantity <= 1) {
                                    return (
                                        Alert.alert(
                                            "Remover",
                                            "Deseja remover esse produto?",
                                            [
                                                {
                                                    text: "Não",
                                                    onPress: () => { },
                                                    style: 'cancel',

                                                },
                                                {
                                                    text: "Remover",
                                                    onPress: () => dispatch(
                                                        cartActions.removeFromCart(itemData.item.productId)
                                                    )
                                                }
                                            ]
                                        )
                                    )

                                } else {
                                    dispatch(
                                        cartActions.removeFromCart(itemData.item.productId)
                                    );
                                };
                            }}
                        />
                    </Card>
                )}
            />
        </View>
    );
};

export const screenOptions = navData => {
    
    return {
        headerTitle: 'Your Cart',
        headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        headerTitleStyle: {
            fontFamily: Fonts.bold,
            fontSize: 22
        },
        headerLeft: () => {
            return (
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                        navData.navigation.goBack()
                    }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )
        },
        headerRight: () => {
            const currentQuantity = useSelector(state => state.cart.totalQuantity);
            return (
                <View style={styles.qtyContainer}>
                    <Text style={styles.quantity}>
                        {currentQuantity}
                    </Text>
                </View>
            )
        }
    }
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20
    },

    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },

    summaryText: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: 'white'
    },

    amount: {
        color: Colors.primary
    },

    qtyContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        left: -190
    },

    quantity: {
        fontFamily: Fonts.bold,
        color: 'white',
        fontSize: 16
    }
});