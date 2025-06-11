import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { header } from "../appImports/styles";
import { back } from "../appImports/icons";

const FundelurHeaderSmart = ({ pageName, main }) => {
    const navigation = useNavigation();

    return (
        <View style={header.container}>
            {!main && (
                <TouchableOpacity
                    style={{marginRight: 8}}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={back}
                        style={header.back} />
                </TouchableOpacity>
            )}
            <Text style={
                {
                    fontWeight: '400',
                    color: '#fff',
                    fontSize: main ? 25 : 16,
                    lineHeight: main ? 28 : 20
                }
            }>
                {pageName}
            </Text>
        </View>
    )
};

export default FundelurHeaderSmart;