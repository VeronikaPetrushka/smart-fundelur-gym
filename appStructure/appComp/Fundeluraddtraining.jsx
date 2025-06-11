import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, form } from '../appImports/styles';
import { format } from 'date-fns';

const Fundeluraddtraining = ({ item }) => {
    const navigation = useNavigation();

    const [type, setType] = useState(item ? item.type : null);
    const [coach, setCoach] = useState(item ? item.coach : null);

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const parseTime = (timeStr) => {
        if (!timeStr) return new Date();
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    };

    const [date, setDate] = useState(item ? parseDate(item.date) : new Date());
    const [time, setTime] = useState(item ? parseTime(item.time) : new Date());

    const addTraining = async () => {
        if (!date || !time || !coach) {
            alert('Please fill in all required fields.');
            return;
        }

        const formatDate = (date) => {
            const d = new Date(date);
            return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
        };

        const formattedTime = format(time, 'h:mm a');

        const newTraining = {
            id: item ? item.id : Date.now().toString(),
            type: type.trim(),
            date: formatDate(date),
            time: formattedTime,
            coach
        };

        try {
            const existingTrainings = JSON.parse(await AsyncStorage.getItem('gymTrainings')) || [];

            let updatedTrainings;
            if (item) {
                updatedTrainings = existingTrainings.map((training) =>
                    training.id === item.id ? newTraining : training
                );
            } else {
                updatedTrainings = [...existingTrainings, newTraining];
            }

            await AsyncStorage.setItem('gymTrainings', JSON.stringify(updatedTrainings));
            navigation.goBack();
        } catch (error) {
            alert('Error saving training data');
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <TouchableOpacity
                style={[form.doneBtn, (!date || !time || !coach) && {opacity: 0.5}]}
                onPress={addTraining}
                disabled={!date || !time || !coach}
            >
                <Text style={form.doneBtnText}>Done</Text>
            </TouchableOpacity>

            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Text style={form.label}>Type</Text>
                <View style={[common.row, { marginBottom: 16, flexWrap: 'wrap' }]}>
                    {
                        ['⚽ Footbal', '🏀 Basketball', '🏀 Volleyball'].map((typeOption, i) => (
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

                <Text style={form.label}>Date</Text>
                <DateTimePicker 
                    value={date} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDate(selectedDate);
                    }} 
                    style={{alignSelf: 'center'}}
                />

                <Text style={form.label}>Time</Text>
                <DateTimePicker 
                    value={time} 
                    mode="time" 
                    display="spinner" 
                    themeVariant="dark"
                    is24Hour={false} 
                    onChange={(event, selectedTime) => {
                        if (selectedTime) setTime(selectedTime);
                    }} 
                    style={{alignSelf: 'center'}}
                />

                <Text style={form.label}>Coach</Text>
                <TextInput
                    style={form.input}
                    value={coach}
                    onChangeText={setCoach}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <View style={{height: 100}} />

            </ScrollView>
            
        </View>
    )
};

export default Fundeluraddtraining;