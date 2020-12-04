import React from 'react';
import { View, Text, Image } from 'react-native';
import LottieView from 'lottie-react-native';


const Loader = () => {
    return (
        <View style={{ marginRight: 35}}>
            <Image source={require('../../assets/NovaBg_1.gif')}
        style={{width:380, height:'104%', bottom:50}} 
        />
        </View>
        
    )
};

export default Loader;