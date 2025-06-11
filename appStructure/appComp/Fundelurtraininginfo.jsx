import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { common, home, form, info } from '../appImports/styles';
import { fundelur2 } from '../appImports/img';
import { edit, remove } from '../appImports/icons';

const Fundelurtraininginfo = ({ item }) => {
    const navigation = useNavigation();

    const removeTraining = async () => {
        try {
            const existingTrainings = JSON.parse(await AsyncStorage.getItem('gymTrainings')) || [];
            const updatedTrainings = existingTrainings.filter(inv => inv.id !== item.id);
            await AsyncStorage.setItem('gymTrainings', JSON.stringify(updatedTrainings));
            navigation.goBack();
        } catch (error) {
            alert('Error removing training');
        }
    };

    return (
        <View style={common.container}>

            <View style={[common.row, { position: 'absolute', top: -40, right: 0 }]}>
                
                <TouchableOpacity
                    style={[common.toolBtn, { marginRight: 10 }]}
                    onPress={() => navigation.navigate('Fundeluraddtraining', { item })}
                >
                    <Image
                        source={edit}
                        style={{ width: 22, height: 22, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={common.toolBtn}
                    onPress={removeTraining}
                >
                    <Image
                        source={remove}
                        style={{ width: 27, height: 27, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>

            </View>

            <ScrollView style={{ width: '100%', paddingTop: 40 }}>

                <Image
                    source={fundelur2}
                    style={info.image}
                />

                <View style={[form.statusButton, {marginBottom: 16, maxWidth: 130, justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={form.statusButtonText}>{item.type}</Text>
                </View>

                <View style={[common.row, { marginBottom: 15, justifyContent: 'space-between' }]}>
                    <Text style={info.name}>{item.date}</Text>
                    <Text style={info.name}>{item.time}</Text>
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
                        {item.coach}
                    </Text>
                </View>

                <View style={{height: 200}} />

            </ScrollView>

        </View>
    )
};

export default Fundelurtraininginfo;