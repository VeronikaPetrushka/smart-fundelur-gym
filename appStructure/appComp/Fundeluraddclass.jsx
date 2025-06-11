import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, form } from '../appImports/styles';
import { typeArrow, tick } from '../appImports/icons';
import { format } from 'date-fns';

const Fundeluraddclass = ({ client }) => {
    const navigation = useNavigation();

    const [className, setClassName] = useState(null); 
    const [session, setSession] = useState(null);
    const [time, setTime] = useState(new Date());
    const [duration, setDuration] = useState(null);
    const [weekDay, setWeekDay] = useState([]);
    const [frequency, setFrequency] = useState(null);
    const [coach, setCoach] = useState(null);

    const [weekVisible, setWeekVisible] = useState(false);
    const [frequenceyVisible, setFrequencyVisible] = useState(false);
    
    const signForClass = async () => {
        if (!className || !session || !time || !duration || weekDay.length === 0 || !frequency || !coach) {
            alert('Please fill in all required fields.');
            return;
        }

        const formattedTime = format(time, 'h:mm a');

        const newClass = {
            id: Date.now().toString(),
            clientId: client.id,
            className,
            session: session.trim(),
            time: formattedTime,
            duration,
            weekDay,
            frequency,
            coach
        };

        try {
            const existingClasses = JSON.parse(await AsyncStorage.getItem('gymClasses')) || [];
            existingClasses.push(newClass);
            await AsyncStorage.setItem('gymClasses', JSON.stringify(existingClasses));
            navigation.goBack();
        } catch (error) {
            alert('Error saving class data');
            console.error('Error saving class data:', error);
        }
    };

    return (
        <View style={common.container}>

            <TouchableOpacity
                style={[form.doneBtn, (!className || !session || !time || !duration || weekDay.length === 0 || !frequency || !coach) && {opacity: 0.5}]}
                onPress={signForClass}
                disabled={!className || !session || !time || !duration || weekDay.length === 0 || !frequency || !coach}
            >
                <Text style={form.doneBtnText}>Done</Text>
            </TouchableOpacity>
            
            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Text style={form.label}>Class name</Text>
                <TextInput
                    style={form.input}
                    value={className}
                    onChangeText={setClassName}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <Text style={form.label}>Type of session</Text>
                <View style={[common.row, {marginBottom: 16}]}>
                    {
                        ['Group', 'Personal'].map((sessionOption, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[form.statusButton, session === sessionOption && {backgroundColor: '#0900FF'}]}
                                onPress={() => session === sessionOption ? setSession(null) : setSession(sessionOption)}
                            >
                                <Text style={[form.statusButtonText, session === sessionOption && {fontWeight: '800'}]}>{sessionOption}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

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

                <Text style={form.label}>Duration</Text>
                <TextInput
                    style={form.input}
                    value={duration}
                    onChangeText={setDuration}
                    placeholder='Enter text...'
                    placeholderTextColor='#7173AA'
                />

                <TouchableOpacity style={form.typeBtn} onPress={() => setWeekVisible((prev) => !prev)}>
                    <Text style={form.typeBtnText}>Day of the weeks</Text>
                    <Image
                        source={typeArrow}
                        style={[
                            form.typeArrow,
                            weekVisible && { transform: [{ rotate: '180deg' }] }
                        ]}
                    />
                </TouchableOpacity>
                {
                    weekVisible && (
                        <View style={{ width: '100%', marginBottom: 16, marginLeft: 10 }}>
                            {
                                ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                                    <View key={i} style={[common.row, {marginBottom: 7}]}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                weekDay.some((d) => d === day) ?
                                                    setWeekDay(weekDay.filter((d) => d !== day))
                                                    : setWeekDay([...weekDay, day])}
                                            style={form.tickBtn}
                                        >
                                            {
                                                weekDay.some((d) => d === day) && (
                                                    <Image source={tick} style={form.tickIcon} />
                                                )
                                            }
                                        </TouchableOpacity>
                                        <Text style={form.typeBtnText}>{day}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }

                <TouchableOpacity style={form.typeBtn} onPress={() => setFrequencyVisible((prev) => !prev)}>
                    <Text style={form.typeBtnText}>Frequency</Text>
                    <Image
                        source={typeArrow}
                        style={[
                            form.typeArrow,
                            frequenceyVisible && { transform: [{ rotate: '180deg' }] }
                        ]}
                    />
                </TouchableOpacity>
                {
                    frequenceyVisible && (
                        <View style={{ width: '100%', marginBottom: 16, marginLeft: 10 }}>
                            {
                                ['Daily', 'Weekly', 'Monthly'].map((freq, i) => (
                                    <View key={i} style={[common.row, {marginBottom: 7}]}>
                                        <TouchableOpacity
                                            onPress={() => frequency === freq ? setFrequency(null) : setFrequency(freq)}
                                            style={[
                                                form.tickBtn,
                                                { borderRadius: 100, borderWidth: 2, width: 23, height: 23, padding: 3 }
                                            ]}
                                        >
                                            {
                                                frequency === freq && (
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

export default Fundeluraddclass;