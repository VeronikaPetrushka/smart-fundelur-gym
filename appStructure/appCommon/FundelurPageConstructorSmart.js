import FundelurBackSmart from "./FundelurBackSmart";
import fundelurComps from "../appImports/comp";

export const FundeluronboardingPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluronboarding />}
        />
    )
};

export const FundelurhomePage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurhome />}
            header
            main
            pageName={'Home'}
            nav
        />
    )
};

export const FundeluraddclientPage = ({ route }) => {
    const { client } = route.params || {};

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluraddclient client={client} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurclientinfoPage = ({ route }) => {
    const { client } = route.params;

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurclientinfo client={client} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurvisitsPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurvisits />}
            header
            pageName={'Visits'}
        />
    )
};

export const FundeluraddclassPage = ({ route }) => {
    const { client } = route.params;

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluraddclass client={client} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurinventoryPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurinventory />}
            header
            main
            pageName={'Inventory'}
            nav
        />
    )
};

export const FundeluraddinventoryPage = ({ route }) => {
    const { item } = route.params || {};

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluraddinventory item={item} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurinventoryinfoPage = ({ route }) => {
    const { item } = route.params || {};

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurinventoryinfo item={item} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurreportsPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurreports />}
            header
            main
            pageName={'Financial analytics & reports'}
            nav
        />
    )
};

export const FundeluraddpaymentPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluraddpayment />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurtrainingPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurtraining />}
            header
            main
            pageName={'Training'}
            nav
        />
    )
};

export const FundeluraddtrainingPage = ({ route }) => {
    const { item } = route.params || {};

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundeluraddtraining item={item} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelurtraininginfoPage = ({ route }) => {
    const { item } = route.params;

    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurtraininginfo item={item} />}
            header
            pageName={'Back'}
        />
    )
};

export const FundelursettingsPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelursettings />}
            header
            main
            pageName={'Settings'}
            nav
        />
    )
};

export const FundelurnotificationsPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurnotifications />}
            header
            pageName={'Manage notifications'}
        />
    )
};

export const FundelurcurrencyPage = () => {
    return (
        <FundelurBackSmart
            comp={<fundelurComps.Fundelurcurrency />}
            header
            pageName={'Currency selection'}
        />
    )
};