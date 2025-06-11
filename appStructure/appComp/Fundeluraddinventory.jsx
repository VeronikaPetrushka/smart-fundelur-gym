import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, form, inventory } from '../appImports/styles';
import { typeArrow, minus, plus } from '../appImports/icons';

const Fundeluraddinventory = ({ item }) => {
    const navigation = useNavigation();

    const [title, setTitle] = useState(item ? item.title : '');
    const [number, setNumber] = useState(item ? item.number : '');
    const [location, setLocation] = useState(item ? item.location : '');
    const [type, setType] = useState(item ? item.type : '');
    const [quantities, setQuantities] = useState(item ? item.quantities : 0);
    const [status, setStatus] = useState(item ? item.status : '');
    const [nextServiceVisible, setNextServiceVisible] = useState(false);

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [nextService, setNextService] = useState(item ? {
        date: parseDate(item.nextService.date),
        frequency: item.nextService.frequency
    } : {
        date: new Date(),
        frequency: null
    });
    
    const addGymInventory = async () => {
        if (!title || !number || !location || !type || !quantities || !status || !nextService.frequency) {
            alert('Please fill in all required fields.');
            return;
        }

        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}.${month}.${year}`;
        };

        const newInventory = {
            id: item ? item.id : Date.now().toString(),
            title,
            number,
            location,
            type,
            quantities,
            status,
            lastDate: formatDate(new Date()),
            nextService: {date: formatDate(nextService.date ), frequency: nextService.frequency}
        };

        try {
            const existingInventories = JSON.parse(await AsyncStorage.getItem('gymInventory')) || [];
            if (item) {
                const updatedInventories = existingInventories.map(inv =>
                    inv.id === item.id ? newInventory : inv
                );
                await AsyncStorage.setItem('gymInventory', JSON.stringify(updatedInventories));
            } else {
                existingInventories.push(newInventory);
                await AsyncStorage.setItem('gymInventory', JSON.stringify(existingInventories));
            }
            navigation.navigate('Fundelurinventory');
        } catch (error) {
            alert('Error saving inventory');
        }
    };

    return (
        <View style={common.container}>

            <TouchableOpacity
                style={[form.doneBtn,
                    (!title || !number || !location || !type || !quantities || !status || !nextService.frequency) && { opacity: 0.5 }
                ]}
                onPress={addGymInventory}
                disabled={!title || !number || !location || !type || !quantities || !status || !nextService.frequency}
            >
                <Text style={form.doneBtnText}>Done</Text>
            </TouchableOpacity>
            
            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Text style={form.label}>Title</Text>
                <TextInput
                    style={form.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <Text style={form.label}>Number</Text>
                <TextInput
                    style={form.input}
                    value={number}
                    onChangeText={setNumber}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <Text style={form.label}>Location</Text>
                <TextInput
                    style={form.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <Text style={form.label}>Type</Text>
                <View style={[common.row, { marginBottom: 16, flexWrap: 'wrap' }]}>
                    {
                        ['🏋️‍♂️ Exerciser', '🧘‍♀️ Mat', '🏋️‍♀️ Dumbbells', '🏋️ Rack', '🏆 Accessory'].map((typeOption, i) => (
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

                <Text style={form.label}>Quantities</Text>
                <View style={[common.row, { marginBottom: 16 }]}>
                    <TouchableOpacity
                        style={[inventory.quantityBtn, quantities < 1 && {opacity: 0.5}]}
                        onPress={() => setQuantities((prev) => prev - 1)}
                        disabled={quantities < 1}
                    >
                        <Image
                            source={minus}
                            style={inventory.quantityIcon}
                        />
                    </TouchableOpacity>
                    <Text style={inventory.quantityText}>{quantities}</Text>
                    <TouchableOpacity
                        style={inventory.quantityBtn}
                        onPress={() => setQuantities((prev) => prev + 1)}
                    >
                        <Image
                            source={plus}
                            style={inventory.quantityIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={form.label}>Status</Text>
                <View style={[common.row, { marginBottom: 16 }]}>
                    {
                        ['⚙️ In the works', '🧘⚠️ Repairs required'].map((statusOption, i) => (
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

                <TouchableOpacity style={form.typeBtn} onPress={() => setNextServiceVisible((prev) => !prev)}>
                    <Text style={form.typeBtnText}>Next service</Text>
                    <Image
                        source={typeArrow}
                        style={[
                            form.typeArrow,
                            nextServiceVisible && { transform: [{ rotate: '180deg' }] }
                        ]}
                    />
                </TouchableOpacity>
                {
                    nextServiceVisible && (
                        <View style={{ width: '100%' }}>
                            <DateTimePicker 
                                value={nextService.date}
                                mode="date" 
                                display="spinner" 
                                themeVariant="dark"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setNextService(prev => ({
                                            ...prev,
                                            date: selectedDate
                                        }));
                                    }
                                }}
                                style={{alignSelf: 'center'}}
                            />
                            {
                                ['Once a week', 'Every 2 months', 'Every 3 months', 'Once a month', 'Once a year'].map((freq, i) => (
                                    <View key={i} style={[common.row, {marginBottom: 7, marginLeft: 10}]}>
                                        <TouchableOpacity
                                            onPress={() => nextService.frequency === freq ? setNextService({frequency: null}) : setNextService((prev) => ({...prev, frequency: nextService.frequency === freq ? null : freq}))}
                                            style={[
                                                form.tickBtn,
                                                { borderRadius: 100, borderWidth: 2, width: 23, height: 23, padding: 3 }
                                            ]}
                                        >
                                            {
                                                nextService.frequency === freq && (
                                                    <View style={form.freqSelected} />
                                                )
                                            }
                                        </TouchableOpacity>
                                        <Text style={form.typeBtnText}>{freq}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }

                <View style={{height: 100}} />
            </ScrollView>

        </View>
    )
};

export default Fundeluraddinventory;