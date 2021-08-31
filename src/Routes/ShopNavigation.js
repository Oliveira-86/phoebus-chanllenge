import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import CharactersScreen from '../Screens/CharactersScreen';
import CharactersComics, {
    screenOptions as CharactersComicsOption
} from '../Screens/CharactersComicsScreen';
import ComicDetailsScreen from '../Screens/ComicDetailsScreen';

import Fonts from '../Styles/Fonts';
import Colors from '../Styles/Colors';

const StackNavigator = createStackNavigator();

const ShopNavigation = () => {
    return (
        <StackNavigator.Navigator screenOptions={{
            headerTitle: "Characters",
            headerStyle: {
                backgroundColor: Colors.primaryColor
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontFamily: Fonts.bold,
                fontSize: 22,
            },
            headerRight: () => {
                return (
                    <View>
                        <Image source={require('../assets/shield.png')} 
                            style={{ width: 40, height: 40, marginRight: 20 }}
                        />
                    </View>
                )
            }
        }}>
            <StackNavigator.Screen
                name="Characters"
                component={CharactersScreen}
            />
            <StackNavigator.Screen
                name="CharactersComics"
                component={CharactersComics}
                options={CharactersComicsOption}
            />
            <StackNavigator.Screen
                name="ComicDetails"
                component={ComicDetailsScreen}
            />
        </StackNavigator.Navigator>
    )
};

export default ShopNavigation
