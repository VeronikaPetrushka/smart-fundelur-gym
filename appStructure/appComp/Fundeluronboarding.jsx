import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { onboarding, common } from '../appImports/styles';
import { fundelur } from '../appImports/img';
import { useNavigation } from '@react-navigation/native';

const Fundeluronboarding = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);

    const imageOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (index === 0) {
            setShowButton(false);
            Animated.sequence([
                Animated.timing(imageOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowButton(true);
            });
        }
    }, [index]);

    return (
        <View style={common.container}>

            {
                index === 0 && (
                    <View style={common.container}>
                        
                        <Animated.Image
                            source={fundelur}
                            style={[
                                onboarding.image,
                                { opacity: imageOpacity }
                            ]}
                        />
                        <Animated.Text
                            style={[
                                onboarding.appName,
                                { opacity: textOpacity }
                            ]}
                        >
                            Smart Fundelur Gym
                        </Animated.Text>

                        {showButton && (
                            <TouchableOpacity
                                onPress={() => setIndex(1)}
                                style={[common.button, { position: 'absolute', bottom: 50}]}
                            >
                                <Text style={common.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                )
            }

            {
                index === 1 && (
                    <View style={common.container}>
                        
                        <Image
                            source={fundelur}
                            style={onboarding.image}
                        />
                        <Text style={onboarding.title}>👋 Welcome to the world of Fundelur!</Text>
                        <Text style={onboarding.text}>Your virtual assistant, Fundelur, is always there to support you on your way to success and make running your gym even easier and more enjoyable!</Text>

                        <TouchableOpacity
                            style={[common.button, { position: 'absolute', bottom: 50}]}
                            onPress={() => navigation.navigate('Fundelurhome')}
                        >
                            <Text style={common.buttonText}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                )
            }

        </View>
    )
};

export default Fundeluronboarding;