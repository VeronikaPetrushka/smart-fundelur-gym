import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import navInfo from '../appConsts/navInfo';
import { nav } from '../appImports/styles';
import useFundelorNavHandler from './FundelorNavHandler';


const FundelurNavSmart: React.FC = () => {
    const { pageName, managePageName } = useFundelorNavHandler();

    return (
        <View style={nav.container}>

            {
                navInfo.map((fundelurPage, i) => (
                    <View
                        style={[
                            pageName === fundelurPage.pageName &&
                            { borderWidth: 3, borderColor: '#01068F', borderRadius: 100 }
                        ]}
                        key={i}
                    >
                        <TouchableOpacity
                            style={[
                                nav.button,
                                pageName === fundelurPage.pageName && {
                                    marginBottom: 30,
                                    backgroundColor: '#0900FF',
                                    borderColor: '#00034C'
                                }
                            ]}
                            onPress={() => managePageName(fundelurPage.pageName)}
                        >
                            <Image
                                source={fundelurPage.navIcon}
                                style={[
                                    nav.icon,
                                    pageName === fundelurPage.pageName && { tintColor: '#fff' }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                ))
            }
        </View>
    );
};

export default FundelurNavSmart;