import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { home, common } from '../appImports/styles';
import currencies from '../appConsts/currencies';

const Fundelurcurrency = () => {
    const [selectedCurrency, setSelectedCurrency] = useState({
        key: 'USD',
        full: 'US Dollar',
        sign: '$'
    });

    useFocusEffect(
        useCallback(() => {
            const fetchCurrency = async () => {
                try {
                    const stored = await AsyncStorage.getItem('selectedCurrency');
                    if (stored) setSelectedCurrency(JSON.parse(stored));
                } catch (e) {
                    alert('Error loading currency');
                }
            };

            fetchCurrency();
        }, [])
    );

    const storeSelectedCurrency = async (currency) => {
        try {
            await AsyncStorage.setItem('selectedCurrency', JSON.stringify(currency));
            setSelectedCurrency(currency);
        } catch (e) {
            alert('Failed to save currency');
        }
    };

    return (
        <View style={common.container}>

            <ScrollView style={{ width: '100%', paddingTop: 40 }}>
                
                {
                    currencies.map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                home.clientCard,
                                { alignItems: 'center', justifyContent: 'center', padding: 15 },
                                selectedCurrency.key === item.key && {backgroundColor: '#0900FF'}
                            ]}
                            onPress={() => storeSelectedCurrency(item)}
                        >
                            <Text style={[home.clientName, {textAlign: 'center', marginBottom: 0}]}>{item.key} - {item.full}</Text>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>

        </View>
    )
};

export default Fundelurcurrency;