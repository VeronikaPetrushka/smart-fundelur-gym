import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { common, home, form, info } from '../appImports/styles';
import { fundelur } from '../appImports/img';
import { edit, remove } from '../appImports/icons';

const Fundelurinventoryinfo = ({ item }) => {
    const navigation = useNavigation();

    const removeInventory = async () => {
        try {
            const existingInventories = JSON.parse(await AsyncStorage.getItem('gymInventory')) || [];
            const updatedInventories = existingInventories.filter(inv => inv.id !== item.id);
            await AsyncStorage.setItem('gymInventory', JSON.stringify(updatedInventories));
            navigation.goBack();
        } catch (error) {
            alert('Error removing inventory');
        }
    };

    return (
        <View style={common.container}>

            <View style={[common.row, { position: 'absolute', top: -40, right: 0 }]}>
                
                <TouchableOpacity
                    style={[common.toolBtn, { marginRight: 10 }]}
                    onPress={() => navigation.navigate('Fundeluraddinventory', { item })}
                >
                    <Image
                        source={edit}
                        style={{ width: 22, height: 22, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={common.toolBtn}
                    onPress={removeInventory}
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

                <Text style={info.name}>{item.title}</Text>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>Number</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        {item.number}
                    </Text>
                </View>

                <View style={[common.row, { marginBottom: 15}]}>
                    <View style={form.statusButton}>
                        <Text style={form.statusButtonText}>{item.type}</Text>
                    </View>
                    <View style={form.statusButton}>
                        <Text style={form.statusButtonText}>{item.status}</Text>
                    </View>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>Date of last service</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        {item.lastDate}
                    </Text>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>Quantities</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        {item.quantities}
                    </Text>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>Location</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        {item.location}
                    </Text>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={[home.label, { marginBottom: 0 }]}>Next service</Text>
                    <Text style={[
                        home.clientDate,
                        {
                            marginBottom: 0,
                            fontSize: 16,
                            fontWeight: '500'
                        }
                    ]}
                    >
                        <View>
                            <Text
                                style={[
                                    home.clientDate,
                                    {
                                        marginBottom: 7,
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }
                                ]}
                            >
                                {item.nextService.date}
                            </Text>
                            <Text
                                style={[
                                    home.clientDate,
                                    {
                                        marginBottom: 0,
                                        fontSize: 11,
                                        fontWeight: '500'
                                    }
                                ]}
                            >
                                {item.nextService.frequency}
                            </Text>
                        </View>
                    </Text>
                </View>


                <View style={{height: 200}} />

            </ScrollView>

        </View>
    )
};

export default Fundelurinventoryinfo;