import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Styles/Colors';

const HeaderButton = (props) => {
    return (
        <Ionicons.Button {...props} 
            name={props.name}
            size={props.size}
            color='white'
            backgroundColor={Colors.primaryColor}
            style={props.style}
            onPress={props.onPress}
        />
    );
};

export default HeaderButton;