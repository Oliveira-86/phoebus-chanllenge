import React from 'react';
import { View, Image, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../Styles/Colors';

const ViewGradient = (props) => {
    let image = props.image;
    let text = props.text;

    return (
        <View
            onPress={props.onPress}

        >
            <LinearGradient
                colors={[Colors.primaryColor, Colors.secondyColor]}
                style={props.style}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                {image && (
                    <Image
                        source={props.source}
                        style={props.styleImage}
                    />
                )}
                {text && (
                    <View style={props.styleView}>
                        <Text style={props.styleText}>
                            {props.title}
                        </Text>
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};

export default ViewGradient;