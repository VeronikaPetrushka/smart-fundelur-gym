import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, form } from '../appImports/styles';
import { typeArrow, tick } from '../appImports/icons';

const Fundeluraddclient = ({ client }) => {
    const navigation = useNavigation();
    
    const [name, setName] = useState(client ? client.name : '');
    const [contact, setContact] = useState(client ? client.contact : '');
    const [subscription, setSubscription] = useState(client ? client.subscription : null);
    const [subsListVisible, setSubsListVisible] = useState(true);
    const [notes, setNotes] = useState(client ? client.notes : '');
    const [status, setStatus] = useState(client ? client.status : null);

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [startDate, setStartDate] = useState(client && parseDate(client?.startDate) || new Date());
    const [endDate, setEndDate] = useState(client && parseDate(client?.endDate) || new Date());

    const addGymClient = async () => {
        if (!name || !contact || !subscription || !status) {
            alert('Please fill in all required fields.');
            return;
        }

        if (endDate <= startDate) {
            alert('End date must be after start date.');
            return;
        }

        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}.${month}.${year}`;
        };

        const newClient = {
            id: client ? client.id : Date.now().toString(),
            name,
            contact,
            subscription,
            startDate: startDate ? formatDate(startDate) : '',
            endDate: endDate ? formatDate(endDate) : '',
            notes,
            status
        };

        try {
            const existingClients = JSON.parse(await AsyncStorage.getItem('gymClients')) || [];
            if (client) {
                const updatedClients = existingClients.map(c => c.id === client.id ? newClient : c);
                await AsyncStorage.setItem('gymClients', JSON.stringify(updatedClients));
            } else {
                existingClients.push(newClient);
                await AsyncStorage.setItem('gymClients', JSON.stringify(existingClients));
            }
            navigation.navigate('Fundelurhome');
        } catch (error) {
            alert('Error saving client');
        }
    };

    return (
        <View style={common.container}>

            <TouchableOpacity
                style={[form.doneBtn, (!name || !contact || !subscription || !status) && {opacity: 0.5}]}
                onPress={addGymClient}
                disabled={!name || !contact || !subscription || !status}
            >
                <Text style={form.doneBtnText}>Done</Text>
            </TouchableOpacity>
            
            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Text style={form.label}>Name</Text>
                <TextInput
                    style={form.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <Text style={form.label}>Contacts</Text>
                <TextInput
                    style={form.input}
                    value={contact}
                    onChangeText={setContact}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <TouchableOpacity style={form.typeBtn} onPress={() => setSubsListVisible((prev) => !prev)}>
                    <Text style={form.typeBtnText}>Type of subscription</Text>
                    <Image
                        source={typeArrow}
                        style={[
                            form.typeArrow,
                            subsListVisible && { transform: [{ rotate: '180deg' }] }
                        ]}
                    />
                </TouchableOpacity>
                {
                    subsListVisible && (
                        <View style={{ width: '100%', marginBottom: 16, marginLeft: 10 }}>
                            {
                                ['One-time', 'Monthly', 'Yearly'].map((subType, i) => (
                                    <View key={i} style={[common.row, {marginBottom: 7}]}>
                                        <TouchableOpacity
                                            onPress={() => subscription === subType ? setSubscription(null) : setSubscription(subType)}
                                            style={form.tickBtn}
                                        >
                                            {
                                                subscription === subType && (
                                                    <Image source={tick} style={form.tickIcon} />
                                                )
                                            }
                                        </TouchableOpacity>
                                        <Text style={form.typeBtnText} >{subType}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }
                
                <Text style={form.label}>Start date</Text>
                <DateTimePicker 
                    value={client ? new Date(startDate) : startDate} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setStartDate(selectedDate);
                    }} 
                    style={{alignSelf: 'center'}}
                />

                <Text style={form.label}>End date</Text>
                <DateTimePicker 
                    value={client ? new Date(endDate) : endDate} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setEndDate(selectedDate);
                    }} 
                    style={{alignSelf: 'center'}}
                />

                <Text style={form.label}>Notes</Text>
                <TextInput
                    style={[form.input, { minHeight: 124 }]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                    multiline
                />

                <Text style={form.label}>Subscription status</Text>
                <View style={common.row}>
                    {
                        ['Active', 'Frozen', 'Expired'].map((statusOption, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[form.statusButton, status === statusOption && {backgroundColor: '#0900FF'}]}
                                onPress={() => status === statusOption ? setStatus(null) : setStatus(statusOption)}
                            >
                                <Text style={[form.statusButtonText, status === statusOption && {fontWeight: '800'}]}>{statusOption}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <View style={{height: 100}} />

            </ScrollView>

        </View>
    )
};

export default Fundeluraddclient;