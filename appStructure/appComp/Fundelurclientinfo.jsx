import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { common, home, form, info } from '../appImports/styles';
import { fundelur } from '../appImports/img';
import { edit, remove, typeArrow, tick } from '../appImports/icons';
import { useState, useCallback } from 'react';

const Fundelurclientinfo = ({ client }) => {
    const navigation = useNavigation();
    const [classes, setClasses] = useState([]);
    const [markVisible, setMarkVisible] = useState(false);
    const [markStatus, setMarkStatus] = useState(null);
    const [statusListVisible, setStatusListVisible] = useState(false);
    const [markClass, setMarkClass] = useState(null);
    const [classesListVisible, setClassesListVisible] = useState(false);
    const [visitDate, setVisitDate] = useState(new Date())

    useFocusEffect(
        useCallback(() => {
            fetchClasses();
        }, [])
    );

    const removeClient = async () => {
        try {
            const storedClients = await AsyncStorage.getItem('gymClients');
            if (storedClients !== null) {
                const parsedClients = JSON.parse(storedClients);
                const updatedClients = parsedClients.filter(c => c.id !== client.id);
                await AsyncStorage.setItem('gymClients', JSON.stringify(updatedClients));
            } else {
                alert('No clients found to remove.');
                return;
            }

            const storedClasses = await AsyncStorage.getItem('gymClasses');
            if (storedClasses !== null) {
                const parsedClasses = JSON.parse(storedClasses);
                const updatedClasses = parsedClasses.filter(c => c.clientId !== client.id);
                await AsyncStorage.setItem('gymClasses', JSON.stringify(updatedClasses));
            }

            navigation.navigate('Fundelurhome');
        } catch (error) {
            alert('Failed to remove client and classes');
            console.error(error);
        }
    };

    const fetchClasses = async () => {
        try {
            const stored = await AsyncStorage.getItem('gymClasses');
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                const filtered = parsed.filter(c => c.clientId === client.id);
                setClasses(filtered);
            } else {
                return [];
            }
        } catch (error) {
            alert('Failed to retrieve classes');
            return [];
        }
    };

    const markVisit = async () => {
        if (!markClass || !markStatus || !visitDate) {
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

        const newVisit = {
            id: Date.now().toString(),
            clientId: client.id,
            date: formatDate(visitDate),
            status: markStatus,
            className: markClass
        };

         try {
            const existingVisits = JSON.parse(await AsyncStorage.getItem('gymVisits')) || [];
            existingVisits.push(newVisit);
            await AsyncStorage.setItem('gymVisits', JSON.stringify(existingVisits));
            setMarkVisible(false);
            alert('Successufuly marked your visit !');
        } catch (error) {
            alert('Error saving class data');
        }
    }

    return (
        <View style={common.container}>

            <View style={[common.row, { position: 'absolute', top: -40, right: 0 }]}>
                
                <TouchableOpacity
                    style={[common.toolBtn, { marginRight: 10 }]}
                    onPress={() => navigation.navigate('Fundeluraddclient', { client })}
                >
                    <Image
                        source={edit}
                        style={{ width: 22, height: 22, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={common.toolBtn}
                    onPress={removeClient}
                >
                    <Image
                        source={remove}
                        style={{ width: 27, height: 27, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>

            </View>

            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Image
                    source={fundelur}
                    style={info.image}
                />

                {
                    classes.length > 0 && (
                        <TouchableOpacity
                            style={info.visitsBtn}
                            onPress={() => navigation.navigate('Fundelurvisits', { client })}
                        >
                            <Text style={common.buttonText}>Visits</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={info.name}>{client.name}</Text>

                <View style={[common.row, { marginBottom: 15}]}>
                    <View style={form.statusButton}>
                        <Text style={form.statusButtonText}>{client.subscription}</Text>
                    </View>
                    <View style={form.statusButton}>
                        <Text style={form.statusButtonText}>{client.status}</Text>
                    </View>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>End date</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        {client.endDate}
                    </Text>
                </View>

                <Text style={[home.label, { marginBottom: 7 }]}>Notes</Text>

                <Text style={[
                    home.clientDate, 
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                ]}
                >
                    {client.notes}
                </Text>

                {
                    classes.length > 0 && (
                        <View style={{ width: '100%', marginTop: 24 }}>

                            <Text
                                style={[
                                    home.clientDate,
                                    {
                                        marginBottom: 0,
                                        fontSize: 16,
                                        fontWeight: '500',
                                    }
                                ]}
                            >
                                Classes
                            </Text>

                            {
                                classes.map((classItem, i) => (
                                    <View
                                        key={i}
                                        style={{
                                            width: '100%',
                                            borderTopColor: 'rgba(255, 255, 255, 0.15)',
                                            borderTopWidth: 1,
                                            marginTop: 16
                                        }}
                                    >

                                        <Text style={[home.label, { marginBottom: 7, marginTop: 16 }]}>Type of session</Text>
                                        <View
                                            style={[
                                                form.statusButton,
                                                {
                                                    marginBottom: 16,
                                                    maxWidth: 77,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }
                                            ]}
                                        >
                                            <Text style={form.statusButtonText}>{classItem.session}</Text>
                                        </View>

                                        <Text style={[home.label, { marginBottom: 7 }]}>Day of the week</Text>
                                        <View style={[common.row, { marginBottom: 20 }]}>
                                            {
                                                classItem.weekDay.map((day, j) => (
                                                    <Text
                                                        key={j}
                                                        style={[
                                                        home.clientDate,
                                                        {
                                                            marginBottom: 0,
                                                            fontSize: 16,
                                                            fontWeight: '500',
                                                            margin: 5
                                                        }
                                                    ]}
                                                    >
                                                        {day}  {j < classItem.weekDay.length - 1 && '|'}
                                                    </Text>
                                                ))
                                            }
                                        </View>

                                        <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                                            <Text style={[home.label, { marginBottom: 0 }]}>Time</Text>
                                            <Text style={[
                                                home.clientDate,
                                                {
                                                    marginBottom: 0,
                                                    fontSize: 16,
                                                    fontWeight: '500'
                                                }
                                            ]}
                                            >
                                                {classItem.time}
                                            </Text>
                                        </View>

                                        <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                                            <Text style={[home.label, { marginBottom: 0 }]}>Duration</Text>
                                            <Text style={[
                                                home.clientDate,
                                                {
                                                    marginBottom: 0,
                                                    fontSize: 16,
                                                    fontWeight: '500'
                                                }
                                            ]}
                                            >
                                                {classItem.duration}
                                            </Text>
                                        </View>

                                        <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                                            <Text style={[home.label, { marginBottom: 0 }]}>Frequency</Text>
                                            <Text style={[
                                                home.clientDate,
                                                {
                                                    marginBottom: 0,
                                                    fontSize: 16,
                                                    fontWeight: '500'
                                                }
                                            ]}
                                            >
                                                {classItem.frequency}
                                            </Text>
                                        </View>

                                        <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                                            <Text style={[home.label, { marginBottom: 0 }]}>Coach</Text>
                                            <Text style={[
                                                home.clientDate,
                                                {
                                                    marginBottom: 0,
                                                    fontSize: 16,
                                                    fontWeight: '500'
                                                }
                                            ]}
                                            >
                                                {classItem.coach}
                                            </Text>
                                        </View>

                                    </View>
                                ))
                            }

                        </View>
                    )
                }

                <View style={{height: 200}} />

            </ScrollView>

            {
                classes.length > 0 && (
                    <TouchableOpacity
                        style={[
                            common.button,
                            { position: 'absolute', bottom: 100, backgroundColor: '#fff' }
                        ]}
                        onPress={() => setMarkVisible(true)}
                    >
                        <Text style={[common.buttonText, {color: '#0900FF'}]}>Mark as</Text>
                    </TouchableOpacity>
                )
            }

            <TouchableOpacity
                style={[common.button, {position: 'absolute', bottom: 40}]}
                onPress={() => navigation.navigate('Fundeluraddclass', { client })}
            >
                <Text style={common.buttonText}>Sign up for class</Text>
            </TouchableOpacity>

            <Modal
                visible={markVisible}
                transparent
                animationType='slide'
                onRequestClose={() => setMarkVisible(false)}
            >
                <View style={common.markLayout}>
                    <View style={common.markContainer}>

                        <TouchableOpacity
                            style={common.markClose}
                            onPress={() => setMarkVisible(false)}
                        />


                        <ScrollView style={{width: '100%'}}>
                            
                            <View style={[common.row, {justifyContent: 'space-between', marginBottom: 16}]}>
                                <Text style={common.title}>Mark as</Text>
                                <TouchableOpacity onPress={markVisit}>
                                    <Text style={[form.doneBtnText, {fontWeight: '800'}]}>Done</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={form.typeBtn} onPress={() => setClassesListVisible((prev) => !prev)}>
                                <Text style={form.typeBtnText}>Class</Text>
                                <Image
                                    source={typeArrow}
                                    style={[
                                        form.typeArrow,
                                        classesListVisible && { transform: [{ rotate: '180deg' }] }
                                    ]}
                                />
                            </TouchableOpacity>
                            {
                                classesListVisible && (
                                    <View style={{ width: '100%', marginBottom: 16, marginLeft: 10 }}>
                                        {
                                            classes.map((st, i) => (
                                                <View key={i} style={[common.row, {marginBottom: 7}]}>
                                                    <TouchableOpacity
                                                        onPress={() => markClass === st.className ? setMarkClass(null) : setMarkClass(st.className)}
                                                        style={form.tickBtn}
                                                    >
                                                        {
                                                            markClass === st.className && (
                                                                <Image source={tick} style={form.tickIcon} />
                                                            )
                                                        }
                                                    </TouchableOpacity>
                                                    <Text style={form.typeBtnText} >{st.className}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                )
                            }

                            <Text style={[home.label, { marginBottom: 7 }]}>Date</Text>
                            <DateTimePicker 
                                value={visitDate} 
                                mode="date" 
                                display="spinner" 
                                themeVariant="dark"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) setVisitDate(selectedDate);
                                }} 
                                style={{alignSelf: 'center'}}
                            />

                            <TouchableOpacity style={form.typeBtn} onPress={() => setStatusListVisible((prev) => !prev)}>
                                <Text style={form.typeBtnText}>Status</Text>
                                <Image
                                    source={typeArrow}
                                    style={[
                                        form.typeArrow,
                                        statusListVisible && { transform: [{ rotate: '180deg' }] }
                                    ]}
                                />
                            </TouchableOpacity>
                            {
                                statusListVisible && (
                                    <View style={{ width: '100%', marginBottom: 16, marginLeft: 10 }}>
                                        {
                                            ['Present', 'Absent'].map((st, i) => (
                                                <View key={i} style={[common.row, {marginBottom: 7}]}>
                                                    <TouchableOpacity
                                                        onPress={() => markStatus === st ? setMarkStatus(null) : setMarkStatus(st)}
                                                        style={form.tickBtn}
                                                    >
                                                        {
                                                            markStatus === st && (
                                                                <Image source={tick} style={form.tickIcon} />
                                                            )
                                                        }
                                                    </TouchableOpacity>
                                                    <Text style={form.typeBtnText} >{st}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                )
                            }

                        </ScrollView>

                    </View>
                </View>
            </Modal>

        </View>
    )
};

export default Fundelurclientinfo;