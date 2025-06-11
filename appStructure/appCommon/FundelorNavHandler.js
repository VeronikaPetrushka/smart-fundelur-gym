import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const useFundelorNavHandler = () => {
    const navigation = useNavigation();
    const [pageName, setPageName] = useState('Fundelurhome');

    const managePageName = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    useEffect(() => {
        const management = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const activePageName = state.routes[state.index];
                if (activePageName?.name) {
                    setPageName(activePageName.name);
                }
            }
        };

        management();

        const unsubscribe = navigation.addListener('state', management);

        return unsubscribe;
    }, [navigation]);

    return { pageName, managePageName };
};

export default useFundelorNavHandler;