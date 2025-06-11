import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onboarding, home, common, form } from '../appImports/styles';
import { fundelur } from '../appImports/img';
import { filter, typeArrow, tick } from '../appImports/icons';

const Fundelurhome = () => {
    const navigation = useNavigation();
    const [fundelurClients, setFundelurClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
    const [subsListVisible, setSubsListVisible] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchClients = async () => {
                try {
                    const stored = await AsyncStorage.getItem('gymClients');
                    if (stored !== null) {
                        const parsed = JSON.parse(stored);
                        setFundelurClients(parsed);
                        setFilteredClients(parsed);
                    } else {
                        setFundelurClients([]);
                        setFilteredClients([]);
                    }
                } catch (error) {
                    alert('Failed to load clients');
                }
            };

            fetchClients();
        }, [])
    );

    const filterBySubsription = () => {
        if (selectedSubscriptions.length === 0) {
            setFilteredClients(fundelurClients);
        } else {
            const filtered = fundelurClients.filter(client =>
                selectedSubscriptions.includes(client.subscription)
            );
            setFilteredClients(filtered);
        }

        setFilterVisible(false);
    };

    return (
        <View style={common.container}>

            <TouchableOpacity
                style={[common.toolBtn, { position: 'absolute', top: -40, right: 0 }]}
                onPress={() => setFilterVisible(true)}
            >
                <Image
                    source={filter}
                    style={{ width: 29, height: 20, resizeMode: 'contain' }}
                />
            </TouchableOpacity>

            <ScrollView style={{width: '100%', paddingTop: 40}}>

                {
                    filteredClients.length > 0 ? (
                        <View style={{ width: '100%' }}>
                            
                            {filteredClients.map((client, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={home.clientCard}
                                    onPress={() => navigation.navigate('Fundelurclientinfo', { client })}
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
                                </TouchableOpacity>
                            ))}

                        </View>
                    ) : (
                            <View style={{width: '100%'}}>
                                <Image
                                    source={fundelur}
                                    style={onboarding.image}
                                />
                                <Text style={home.noText}>You haven't added any clients yet</Text>
                            </View>
                    )
                }

                <TouchableOpacity style={[common.button, {marginTop: 20}]} onPress={() => navigation.navigate('Fundeluraddclient')}>
                    <Text style={common.buttonText}>Add client</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>

            <Modal
                visible={filterVisible}
                transparent
                animationType='slide'
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={common.markLayout}>
                    <View style={common.markContainer}>

                        <TouchableOpacity
                            style={common.markClose}
                            onPress={() => setFilterVisible(false)}
                        />


                        <ScrollView style={{width: '100%'}}>
                            
                            <View style={[common.row, {justifyContent: 'space-between', marginBottom: 16}]}>
                                <Text style={common.title}>Mark as</Text>
                                <TouchableOpacity onPress={filterBySubsription}>
                                    <Text style={[form.doneBtnText, {fontWeight: '800'}]}>Done</Text>
                                </TouchableOpacity>
                            </View>

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
                                                        onPress={() => selectedSubscriptions.some((s) => s === subType)
                                                            ? setSelectedSubscriptions(selectedSubscriptions.filter((s) => s !== subType))
                                                            : setSelectedSubscriptions([...selectedSubscriptions, subType])
                                                        }
                                                        style={form.tickBtn}
                                                    >
                                                        {
                                                            selectedSubscriptions.some((s) => s === subType) && (
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

                        </ScrollView>

                    </View>
                </View>
            </Modal>

        </View>
    )
};

export default Fundelurhome;