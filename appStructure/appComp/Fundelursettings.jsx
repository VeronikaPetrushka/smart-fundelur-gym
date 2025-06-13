import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { home, common, header } from '../appImports/styles';
import { back } from '../appImports/icons';

const Fundelursettings = () => {
    const navigation = useNavigation();

    const fundelurGymPolicy = async () => {
        const url = 'https://www.termsfeed.com/live/c0022b09-72c5-4ee9-80be-5fa2b9d7ad5a';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            Alert.alert('Unable to open link', 'Please check your internet connection or try again later.');
        }
    };

    return (
        <View style={common.container}>

            <TouchableOpacity
                style={[home.clientCard, common.row, { justifyContent: 'space-between', marginTop: 40, padding: 15 }]}
                onPress={() => navigation.navigate('Fundelurnotifications')}
            >
                <Text style={[home.clientName, {marginBottom: 0}]}>Manage Notifications</Text>
                <View>
                    <Image
                        source={back}
                        style={[header.back, { marginRight: 0, transform: [{ rotate: '180deg' }] }]}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[home.clientCard, common.row, { justifyContent: 'space-between', padding: 15 }]}
                onPress={() => navigation.navigate('Fundelurcurrency')}
            >
                <Text style={[home.clientName, {marginBottom: 0}]}>Currency selection</Text>
                <View>
                    <Image
                        source={back}
                        style={[header.back, { marginRight: 0, transform: [{ rotate: '180deg' }] }]}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[home.clientCard, common.row, { justifyContent: 'space-between', padding: 15 }]}
                onPress={fundelurGymPolicy}
            >
                <Text style={[home.clientName, {marginBottom: 0}]}>Privacy Policy</Text>
                <View>
                    <Image
                        source={back}
                        style={[header.back, { marginRight: 0, transform: [{ rotate: '180deg' }] }]}
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
};

export default Fundelursettings;