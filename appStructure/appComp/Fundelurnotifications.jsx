import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { home, common } from '../appImports/styles';

const Fundelurnotifications = () => {
    const [switches, setSwitches] = useState({
        payments: false,
        renewals: false,
        inventory: false,
    });

    useEffect(() => {
        const loadSwitches = async () => {
            try {
                const stored = await AsyncStorage.getItem('gymNotifications');
                if (stored) {
                    setSwitches(JSON.parse(stored));
                }
            } catch (e) {
                alert('Failed to load switches');
            }
        };
        loadSwitches();
    }, []);

    const toggleSwitch = async (key) => {
        const updated = { ...switches, [key]: !switches[key] };
        setSwitches(updated);
        try {
            await AsyncStorage.setItem('gymNotifications', JSON.stringify(updated));
        } catch (e) {
            alert('Failed to save switch');
        }
    };

    return (
        <View style={common.container}>

            <View style={{height: 40}} />
            {
                ['Payments', 'Renewals', 'Inventory'].map((key) => (
                    <View key={key} style={[home.clientCard, common.row, {padding: 15, justifyContent: 'space-between'}]}>
                        <Text style={[home.clientName, {marginBottom: 0}]}>{key}</Text>
                        <Switch
                            value={switches[key]}
                            onValueChange={() => toggleSwitch(key)}
                            trackColor={{ false: '#ccc', true: '#0900FF' }}
                            thumbColor={switches[key] ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                ))
            }
        </View>
    );
};

export default Fundelurnotifications;
