import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import CharactersScreen, {
    screenOptions as CharactersOptions
} from '../Screens/CharactersScreen';

import CartScreen, {
    screenOptions as CartOptions
} from '../Screens/CartScreen';

import ComicDetailsScreen, {
    screenOptions as DetailsComicsOptions
} from '../Screens/ComicDetailsScreen';

import Colors from '../Styles/Colors';

const navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTitle: () => {
            return (
                <Image 
                    source={{ uri: 'https://http2.mlstatic.com/D_NQ_NP_833737-MLB29362223977_022019-O.jpg'}}
                    style={{ width: 130, height: 70, top: -15 }}
                />
            )
        },
        headerTintColor: 'white',
       
    }
}

const StackNavigator = createStackNavigator();

const ShopNavigation = () => {

    return (
        <StackNavigator.Navigator screenOptions={navigationOptions}>
            <StackNavigator.Screen
                name="Characters"
                component={CharactersScreen}
                options={CharactersOptions}
            />
            <StackNavigator.Screen
                name="Details"
                component={ComicDetailsScreen}
                options={DetailsComicsOptions}
            />
            <StackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={CartOptions}
            />
        </StackNavigator.Navigator>
    )
};

export default ShopNavigation
