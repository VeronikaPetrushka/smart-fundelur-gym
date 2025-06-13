import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get("window");

export const back = StyleSheet.create({

    header: {
        width: width,
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        zIndex: 10
    },

    page: {
        backgroundColor: '#00034C',
        width: '100%',
        height: '100%',
        paddingTop: 107,
        paddingHorizontal: 20,
        alignItems: 'center'
    },

    nav: {
        width: width,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        zIndex: 10
    }

});

export const nav = StyleSheet.create({

    container: {
        width: '100%',
        height: 100,
        paddingHorizontal: 26,
        paddingBottom: 30,
        backgroundColor: '#01068F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    button: {
        borderRadius: 100,
        width: 67,
        height: 67,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 10,
        borderColor: 'transparent'
    }

});

export const header = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: '#000470',
        paddingTop: height * 0.09,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    back: {
        width: 9,
        height: 15,
        resizeMode: 'contain',
        marginRight: 3
    }

});

export const onboarding = StyleSheet.create({

    image: {
        width: '100%',
        height: height * 0.4,
        resizeMode: 'contain',
        marginBottom: height * 0.04
    },

    appName: {
        fontSize: 45,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 48
    },

    title: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 28,
        marginBottom: 12
    },

    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 20
    }
        
});


export const home = StyleSheet.create({

    noText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 30
    },

    clientCard: {
        width: '100%',
        backgroundColor: '#000470',
        borderRadius: 15,
        padding: 10,
        marginBottom: 5,
    },

    clientName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5
    },

    label: {
        fontSize: 12,
        color: '#7173AA',
        fontWeight: '400',
        lineHeight: 18,
    },

    clientDate: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 5
    }

});

export const common = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    button: {
        width: '100%',
        backgroundColor: '#0900FF',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '800',
        lineHeight: 22
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    toolBtn: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 12
    },

    markLayout: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },

    markContainer: {
        position: 'absolute',
        bottom: 0,
        width: width,
        maxHeight: '50%',
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#00034C',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
    },

    title: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 28
    },

    markClose: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
        width: 70,
        height: 2.5,
        borderRadius: 10,
        backgroundColor: '#fff'
    }

});

export const form = StyleSheet.create({

    doneBtn: {
        position: 'absolute',
        top: -28,
        right: 0,
        zIndex: 12
    },

    doneBtnText: {
        fontSize: 15,
        color: '#0900FF',
        fontWeight: '400',
        lineHeight: 22
    },

    label: {
        fontSize: 12,
        color: '#7173AA',
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 5
    },

    typeBtn: {
        width: '100%',
        backgroundColor: '#000470',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    typeBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22
    },

    typeArrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },

    tickBtn: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0900FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },

    tickIcon: {
        width: 10,
        height: 9,
        resizeMode: 'contain'
    },

    freqSelected: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: '#0900FF'
    },

    input: {
        width: '100%',
        backgroundColor: '#000470',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        marginBottom: 16,
    },

    statusButton: {
        backgroundColor: '#01068F',
        borderRadius: 9,
        padding: 10,
        marginRight: 5
    },

    statusButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 22
    }

});

export const info = StyleSheet.create({

    image: {
        width: 234,
        height: 234,
        resizeMode: 'contain',
        marginBottom: 30,
        alignSelf: 'center'
    },

    name: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '500',
        lineHeight: 28,
        marginBottom: 15
    },

    visitsBtn: {
        backgroundColor: '#0900FF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    },

});

export const visitss = StyleSheet.create({

    statusBox: {
        borderWidth: 1,
        borderRadius: 9,
        padding: 10,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3
    },

    statusText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '900',
        lineHeight: 22
    }

});

export const inventory = StyleSheet.create({

    quantityBtn: {
        width: 50,
        height: 29,
        borderRadius: 7,
        backgroundColor: '#01068F',
        alignItems: 'center',
        justifyContent: 'center'
    },

    quantityIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain'
    },

    quantityText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '900',
        lineHeight: 22,
        marginHorizontal: 10
    }

})