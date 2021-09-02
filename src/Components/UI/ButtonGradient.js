import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';

const ButtonGradient = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <LinearGradient
                colors={[Colors.primaryColor, Colors.secondyColor]}
                style={props.style}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={[{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: Fonts.bold
                },  props.textStyle ]}>
                    {props.text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ButtonGradient;