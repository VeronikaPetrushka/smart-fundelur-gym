import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, form, home, onboarding } from '../appImports/styles';
import { fundelur } from '../appImports/img';

const Fundeluraddpayment = ({ payment }) => {
    const navigation = useNavigation();
    const [fundelurClients, setFundelurClients] = useState([]);

    const [type, setType] = useState(payment ? payment.type : '');
    const [amount, setAmount] = useState(payment ? payment.amount : '');
    const [selectedClient, setSelectedClient] = useState(payment ? payment.clientId : '');

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [date, setDate] = useState(payment && parseDate(payment?.date) || new Date());

    useFocusEffect(
        useCallback(() => {
            const fetchClients = async () => {
                try {
                    const stored = await AsyncStorage.getItem('gymClients');
                    if (stored !== null) {
                        const parsed = JSON.parse(stored);
                        setFundelurClients(parsed);
                    } else {
                        setFundelurClients([]);
                    }
                } catch (error) {
                    alert('Failed to load clients');
                }
            };

            fetchClients();
        }, [])
    );

    const addPayment = async () => {
        if (!type || !amount || !selectedClient || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        const client = fundelurClients.find((c) => c.id === selectedClient);

        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}.${month}.${year}`;
        };

        const newPayment = {
            id: payment ? payment.id : Date.now().toString(),
            type,
            amount,
            clientId: selectedClient,
            clientName: client ? client.name : '',
            date: formatDate(date)
        };

        try {
            const existingPayments = JSON.parse(await AsyncStorage.getItem('gymPayments')) || [];

            if (payment) {
                const updatedPayments = existingPayments.map(p =>
                    p.id === payment.id ? newPayment : p
                );
                await AsyncStorage.setItem('gymPayments', JSON.stringify(updatedPayments));
            } else {
                existingPayments.push(newPayment);
                await AsyncStorage.setItem('gymPayments', JSON.stringify(existingPayments));
            }

            navigation.navigate('Fundelurreports');
        } catch (error) {
            alert('Error saving payment.');
        }
    };
    
    return (
        <View style={common.container}>

            {
                fundelurClients.length > 0 ? (
                    <TouchableOpacity
                        style={[form.doneBtn, (!type || !amount || !selectedClient || !date) && {opacity: 0.5}]}
                        onPress={addPayment}
                        disabled={!type || !amount || !selectedClient || !date}
                    >
                        <Text style={form.doneBtnText}>Done</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={form.doneBtn}
                        onPress={() => navigation.navigate('Fundelurhome')}
                    >
                        <Text style={form.doneBtnText}>Home</Text>
                    </TouchableOpacity>
                )
            }

            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                {
                    fundelurClients.length > 0 ? (
                        <View style={{width: '100%'}}>
                            <Text style={form.label}>Payment date</Text>
                            <DateTimePicker 
                                value={payment ? new Date(date) : date} 
                                mode="date" 
                                display="spinner" 
                                themeVariant="dark"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) setDate(selectedDate);
                                }} 
                                style={{alignSelf: 'center'}}
                            />

                            <Text style={form.label}>Type</Text>
                            <View style={[common.row, { marginBottom: 16, flexWrap: 'wrap' }]}>
                                {
                                    ['🏋️💳 Subscription', '🧘💪 Personal training', '🏋️🏢 Rent a hall'].map((typeOption, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={[
                                                form.statusButton,
                                                type === typeOption && { backgroundColor: '#0900FF' },
                                                { marginBottom: 5 }
                                            ]}
                                            onPress={() => type === typeOption ? setType(null) : setType(typeOption)}
                                        >
                                            <Text style={[form.statusButtonText, type === typeOption && {fontWeight: '800'}]}>{typeOption}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <Text style={form.label}>Amount</Text>
                            <TextInput
                                style={form.input}
                                value={amount}
                                onChangeText={setAmount}
                                placeholder='Enter text ...'
                                placeholderTextColor='#7173AA'
                                keyboardType='numeric'
                            />

                            <Text style={form.label}>Choose a client</Text>
                            {
                                fundelurClients.length > 0 && (
                                    <View style={{ width: '100%' }}>
                                                                
                                        {fundelurClients.map((client, index) => (
                                            <View
                                                key={index}
                                                style={home.clientCard}
                                            >
                                                <Text
                                                    style={home.clientName}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                >
                                                    {client.name}
                                                </Text>
                                                <Text style={home.label}>End date</Text>
                                                <Text style={home.clientDate}>{client.endDate}</Text>
                                                <View style={common.row}>
                                                    <View style={form.statusButton}>
                                                        <Text style={form.statusButtonText}>{client.subscription}</Text>
                                                    </View>
                                                    <View style={form.statusButton}>
                                                        <Text style={form.statusButtonText}>{client.status}</Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => selectedClient === client.id ? setSelectedClient(null) : setSelectedClient(client.id)}
                                                    style={[
                                                        form.tickBtn,
                                                        {
                                                            borderRadius: 100,
                                                            borderWidth: 2,
                                                            width: 23,
                                                            height: 23,
                                                            padding: 3,
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10
                                                        }
                                                    ]}
                                                >
                                                    {
                                                        selectedClient === client.id && (
                                                            <View style={form.freqSelected} />
                                                        )
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        ))}

                                    </View>
                                )
                            }
                        </View>
                    ) : (
                            <View style={{width: '100%'}}>
                                <Image
                                    source={fundelur}
                                    style={onboarding.image}
                                />
                                <Text style={home.noText}>To add a payment, firstly, you need to create a client in the Home screen.</Text>
                            </View>
                    )
                }

                
                <View style={{height: 100}} />

            </ScrollView>

        </View>
    )
};

export default Fundeluraddpayment;