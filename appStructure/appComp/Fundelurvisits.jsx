import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { common, visitss, home } from '../appImports/styles';

const Fundelurvisits = () => {
    const [visits, setVisits] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchVisits();
        }, [])
    );

    const fetchVisits = async () => {
        try {
            const stored = await AsyncStorage.getItem('gymVisits');
            if (stored !== null) {
                const parsed = JSON.parse(stored);

                const sorted = parsed.sort((a, b) => {
                    const [dayA, monthA, yearA] = a.date.split('.').map(Number);
                    const [dayB, monthB, yearB] = b.date.split('.').map(Number);

                    const dateA = new Date(yearA, monthA - 1, dayA);
                    const dateB = new Date(yearB, monthB - 1, dayB);

                    return dateB - dateA;
                });

                setVisits(sorted);
            } else {
                setVisits([]);
            }
        } catch (error) {
            console.error('Failed to load visits:', error);
        }
    };

    return (
        <View style={common.container}>

            <ScrollView style={{width: '100%', paddingTop: 40}}>
                {
                    visits.map((visit, i) => (
                        <View key={i} style={home.clientCard}>
                            <Text style={[home.label, {fontSize: 14, marginBottom: 5}]}>{visit.className}</Text>
                            <Text style={home.clientName}>{visit.date}</Text>
                            <View
                                style={[
                                    visitss.statusBox,
                                    { borderColor: visit.status === 'Present' ? '#39FA20' : '#FF2424' }
                                ]}
                            >
                                <Text
                                    style={[
                                        visitss.statusText,
                                        { color: visit.status === 'Present' ? '#39FA20' : '#FF2424' }
                                    ]}>
                                    {visit.status}
                                </Text>
                            </View>
                        </View>
                    ))
                }
                <View style={{height: 100}} />
            </ScrollView>

        </View>
    )
};

export default Fundelurvisits;