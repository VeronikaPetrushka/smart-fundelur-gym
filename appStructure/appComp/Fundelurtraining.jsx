import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onboarding, home, common, form } from '../appImports/styles';
import { fundelur2 } from '../appImports/img';
import { parse, format, getISOWeek, getYear } from 'date-fns';

const Fundelurtraining = () => {
    const navigation = useNavigation();
    const [fundelurTrainings, setFundelurTrainings] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchInventory = async () => {
                try {
                    const stored = await AsyncStorage.getItem('gymTrainings');
                    if (stored !== null) {
                        const parsed = JSON.parse(stored);
                        setFundelurTrainings(parsed);
                    } else {
                        setFundelurTrainings([]);
                    }
                } catch (error) {
                    alert('Failed to load trainings');
                }
            };

            fetchInventory();
        }, [])
    );

    const getGroupedByWeek = () => {
        const weeksMap = {};

        const sorted = [...fundelurTrainings].sort((a, b) => {
            const aDate = parse(a.date, 'dd.MM.yyyy', new Date());
            const bDate = parse(b.date, 'dd.MM.yyyy', new Date());
            return bDate - aDate;
        });

        sorted.forEach((item) => {
            const dateObj = parse(item.date, 'dd.MM.yyyy', new Date());
            const week = getISOWeek(dateObj);
            const year = getYear(dateObj);
            const weekKey = `${year}-W${week.toString().padStart(2, '0')}`;
            const weekday = format(dateObj, 'EEE');

            if (!weeksMap[weekKey]) {
                weeksMap[weekKey] = {};
            }

            if (!weeksMap[weekKey][weekday]) {
                weeksMap[weekKey][weekday] = [];
            }

            weeksMap[weekKey][weekday].push(item);
        });

        return weeksMap;
    };

    const grouped = getGroupedByWeek();

    return (
        <View style={common.container}>

            <ScrollView style={{width: '100%', paddingTop: 40}}>

                {
                    fundelurTrainings.length > 0 ? (
                        <View style={{ width: '100%' }}>
                            
                            <View style={[home.clientCard, {backgroundColor: '#01068F', alignItems: 'center', marginBottom: 30}]}>
                                <Text style={[home.clientDate, { marginBottom: 10, textAlign: 'center', fontSize: 16, fontWeight: '600' }]}>Total number of training sessions</Text>
                                <Text style={[home.clientName, {fontSize: 45, fontWeight: '600', lineHeight: 48, marginBottom: 0, alignSelf: 'center', textAlign: 'center'}]}>{fundelurTrainings.length}</Text>
                            </View>

                            {
                                Object.entries(grouped).map(([weekKey, weekdays]) => (
                                    <View key={weekKey} style={{ marginBottom: 40 }}>
                                        <Text style={[home.clientDate, { fontSize: 12, fontWeight: '600', marginBottom: 10, color: '#7173AA' }]}>
                                            {weekKey}
                                        </Text>

                                        {
                                            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                                weekdays[day] ? (
                                                    <View key={day} style={{ marginBottom: 20 }}>
                                                        <Text style={[home.clientDate, { fontSize: 18, fontWeight: '600', marginBottom: 10 }]}>
                                                            {day}
                                                        </Text>
                                                        {
                                                            weekdays[day].map((item, i) => (
                                                                <TouchableOpacity
                                                                    key={i}
                                                                    style={home.clientCard}
                                                                    onPress={() => navigation.navigate('Fundelurtraininginfo', { item })}
                                                                >
                                                                    <View style={[form.typeBtn, { backgroundColor: '#0900FF', width: 'content', maxWidth: 120, alignItems: 'center', justifyContent: 'center' }]}>
                                                                        <Text style={[form.typeBtnText, { fontSize: 14, width: 'content' }]}>{item.type.trim()}</Text>
                                                                    </View>
                                                                    <View style={common.row}>
                                                                        <View style={{ marginRight: 20 }}>
                                                                            <Text style={home.label}>Date</Text>
                                                                            <Text style={home.clientDate}>{item.date}</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Text style={home.label}>Time</Text>
                                                                            <Text style={home.clientDate}>{item.time}</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ))
                                                        }
                                                    </View>
                                                ) : null
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </View>
                    ) : (
                        <View style={{ width: '100%' }}>
                            <Image
                                source={fundelur2}
                                style={onboarding.image}
                            />
                            <Text style={home.noText}>You don't have the data yet</Text>
                        </View>
                    )
                }
                <TouchableOpacity style={[common.button, {marginTop: 20}]} onPress={() => navigation.navigate('Fundeluraddtraining')}>
                    <Text style={common.buttonText}>Add training</Text>
                </TouchableOpacity>

                <View style={{height: 150}} />
            </ScrollView>

        </View>
    )
};

export default Fundelurtraining;