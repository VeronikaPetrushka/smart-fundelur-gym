import React, { ReactNode } from 'react';
import { View } from 'react-native';
import FundelurNavSmart from './FundelurNavSmart';
import FundelurHeaderSmart from './FundelurHeaderSmart';
import { back } from '../appImports/styles';

interface FundelurBackSmartProps {
    header?: boolean;
    pageName: String;
    main?: boolean;
    comp: ReactNode;
    nav?: boolean;
}

const FundelurBackSmart: React.FC<FundelurBackSmartProps> = ({ header, pageName, main, comp, nav }) => {
    return (
        <View style={{ flex: 1 }}>
            {header && (
                <View style={back.header}>
                    <FundelurHeaderSmart pageName={pageName} main={main} />
                </View>
            )}

            <View style={back.page}>{comp}</View>

            {nav && (
                <View style={back.nav}>
                    <FundelurNavSmart />
                </View>
            )}  
        </View>
      
    );
};

export default FundelurBackSmart;
