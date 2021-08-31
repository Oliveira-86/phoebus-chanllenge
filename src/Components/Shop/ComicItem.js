import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground
} from 'react-native'; 

import Fonts from '../../Styles/Fonts';

const MealItem = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={props.onSelectMeal}
            >
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground
                            source={{ uri: props.image }}
                            style={styles.imgBg}
                        >
                            <View style={styles.textBg}>
                                <Text
                                    style={styles.text}
                                    numberOfLines={1}
                                >
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
                        <Text style={styles.subtitle}>{props.duration}m</Text>
                        <Text style={styles.subtitle}>{props.complexity.toUpperCase()}</Text>
                        <Text style={styles.subtitle}>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MealItem;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        backgroundColor: '#e6e6e6',
        marginBottom: 25,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10
    },

    mealRow: {
        flexDirection: 'row'
    },

    imgBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },

    mealHeader: {
        height: '85%'
    },
    mealDetails: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%',
        backgroundColor: 'rgba(245, 11, 11, 0.75)'
    },

    textBg: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
        height: "100%",
        justifyContent: 'flex-end'
    },

    text: {
        fontFamily: Fonts.bold,
        fontSize: 22,
        color: 'white',    
    },

   subtitle: {
       fontFamily: Fonts.semi,
       fontSize: 13,
       color: 'white'
   }
});