import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onboarding, home, common, form } from '../appImports/styles';
import { fundelur } from '../appImports/img';

const Fundelurinventory = () => {
    const navigation = useNavigation();
    const [fundelurInventory, setFundelurInventory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchInventory = async () => {
                try {
                    const stored = await AsyncStorage.getItem('gymInventory');
                    if (stored !== null) {
                        const parsed = JSON.parse(stored);
                        setFundelurInventory(parsed);
                    } else {
                        setFundelurInventory([]);
                    }
                } catch (error) {
                    alert('Failed to load inventory');
                }
            };

            fetchInventory();
        }, [])
    );

    return (
        <View style={common.container}>

            <ScrollView style={{width: '100%', paddingTop: 40}}>

                {
                    fundelurInventory.length > 0 ? (
                        <View style={{ width: '100%' }}>
                            
                            {fundelurInventory.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={home.clientCard}
                                    onPress={() => navigation.navigate('Fundelurinventoryinfo', { item })}
                                >
                                    <Text
                                        style={home.clientName}
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={home.label}>Location</Text>
                                    <Text style={home.clientDate}>{item.location}</Text>
                                    <View style={common.row}>
                                        <View style={form.statusButton}>
                                            <Text style={form.statusButtonText}>{item.type}</Text>
                                        </View>
                                        <View style={form.statusButton}>
                                            <Text style={form.statusButtonText}>{item.status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>
                    ) : (
                            <View style={{width: '100%'}}>
                                <Image
                                    source={fundelur}
                                    style={onboarding.image}
                                />
                                <Text style={home.noText}>You haven't added any inventory yet</Text>
                            </View>
                    )
                }

                <TouchableOpacity style={[common.button, {marginTop: 20}]} onPress={() => navigation.navigate('Fundeluraddinventory')}>
                    <Text style={common.buttonText}>Add inventory</Text>
                </TouchableOpacity>

                <View style={{height: 150}} />
            </ScrollView>

        </View>
    )
};

export default Fundelurinventory;