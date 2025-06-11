import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onboarding, home, common, form } from '../appImports/styles';
import { fundelur3 } from '../appImports/img';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Fundelurreports = () => {
    const navigation = useNavigation();
    const [fundelurPayments, setFundelurPayments] = useState([]);
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
    const [selectedCurrency, setSelectedCurrency] = useState({
        key: 'USD',
        full: 'US Dollar',
        sign: '$'
    });

    useFocusEffect(
        useCallback(() => {
            const fetchCurrency = async () => {
                try {
                    const stored = await AsyncStorage.getItem('selectedCurrency');
                    if (stored) setSelectedCurrency(JSON.parse(stored));
                } catch (e) {
                    alert('Error loading currency');
                }
            };

            fetchCurrency();
        }, [])
    );
    
    useFocusEffect(
        useCallback(() => {
            const fetchPayments = async () => {
                try {
                    const stored = await AsyncStorage.getItem('gymPayments');
                    if (stored !== null) {
                        const parsed = JSON.parse(stored);
                        setFundelurPayments(parsed);
                    } else {
                        setFundelurPayments([]);
                    }
                } catch (error) {
                    alert('Failed to load report');
                }
            };

            fetchPayments();
        }, [])
    );

    const getRecentMonths = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const months = [];
        for (let i = 5; i >= 0; i--) {
            let month = (currentMonth - i + 12) % 12;
            months.push(month);
        }
        return months;
    };

    const filteredPayments = useMemo(() => {
        return fundelurPayments.filter(payment => {
            const [day, month, year] = payment.date.split('.');
            return parseInt(month) - 1 === activeMonth;
        });
    }, [fundelurPayments, activeMonth]);

    const demandedServices = () => {
        const typeCounts = {};
        filteredPayments.forEach(payment => {
            if (!typeCounts[payment.type]) {
                typeCounts[payment.type] = 0;
            }
            typeCounts[payment.type]++;
        });

        const sortedTypes = Object.entries(typeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([type]) => ({ type }));

        return sortedTypes;
    };

    const totalPayments = () => {
        const total = filteredPayments.reduce((sum, payment) => {
            const amount = parseFloat(payment.amount);
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);

        return Number.isInteger(total) ? total.toString() : total.toFixed(2);
    };

    const exportReport = async () => {
        if (filteredPayments.length === 0) {
            alert('No payments to export.');
            return;
        }

        const topServices = demandedServices().map(s => s.type).join(', ');
        const total = totalPayments();

        const rows = filteredPayments.map(item => (
            `<tr>
                <td>${item.clientName}</td>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>${item.amount} $</td>
            </tr>`
        )).join('');

        const html = `
            <h1>Fundelur Monthly Report - ${MONTHS[activeMonth]}</h1>
            <p><strong>Most Demanded Services:</strong> ${topServices}</p>
            <p><strong>Total Revenue:</strong> ${total} $</p>
            <p><strong>Number of Payments:</strong> ${filteredPayments.length}</p>
            <br/>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr><th>Name</th><th>Date</th><th>Type</th><th>Amount</th></tr>
                ${rows}
            </table>
        `;

        try {
            const fileName = `fundelur_report_${MONTHS[activeMonth]}`;
            const options = {
                html,
                fileName,
                directory: 'Documents',
            };

            const pdf = await RNHTMLtoPDF.convert(options);

            if (Platform.OS === 'android') {
                const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;
                await RNFS.copyFile(pdf.filePath, downloadPath);
                alert(`PDF saved to Downloads: ${downloadPath}`);

                await Share.open({
                    url: `file://${downloadPath}`,
                    type: 'application/pdf',
                    failOnCancel: false,
                });

            } else {
                await Share.open({
                    url: `file://${pdf.filePath}`,
                    type: 'application/pdf',
                    failOnCancel: false,
                });
            }

        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export report');
        }
    };

    return (
        <View style={common.container}>

            <ScrollView style={{width: '100%', paddingTop: 40}}>

                {
                    fundelurPayments.length > 0 ? (
                        <View style={{ width: '100%' }}>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginBottom: 20 }}
                                contentContainerStyle={{flexDirection: 'row-reverse'}}
                            >
                                {getRecentMonths().map((month, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            marginRight: 10
                                        }}
                                        onPress={() => setActiveMonth(month)}
                                    >
                                        <Text style={[
                                            { fontWeight: '600', color: '#7173AA' },
                                            month === activeMonth && { color: '#0900FF', textDecorationLine: 'underline' }
                                        ]}
                                        >
                                            {MONTHS[month]}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <View style={[home.clientCard, {backgroundColor: '#01068F'}]}>
                                <Text style={[home.clientDate, { marginBottom: 10 }]}>The most demanded services</Text>
                                <View style={[common.row, {flexWrap: 'wrap'}]}>
                                    {
                                        demandedServices().map((service, i) => (
                                            <View key={i} style={[form.typeBtn, {width: 'content', alignSelf: 'flex-end', marginBottom: 5, marginRight: 5}]}>
                                                <Text style={[form.typeBtnText, {fontSize: 14}]}>{service.type}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>

                            <View style={[common.row, { justifyContent: 'space-between', marginBottom: 30 }]}>
                                
                                <View style={[home.clientCard, {backgroundColor: '#01068F', width: '48%', height: 112, justifyContent: 'space-between', alignItems: 'flex-start'}]}>
                                    <Text style={[home.clientDate, {marginBottom: 10}]}>Revenue</Text>
                                    <Text style={[home.clientName, { fontSize: 32, fontWeight: '600', lineHeight: 38, marginBottom: 0 }]}>{totalPayments()} {selectedCurrency.sign}</Text>
                                </View>
                                <View style={[home.clientCard, {backgroundColor: '#01068F', width: '48%', height: 112, justifyContent: 'space-between'}]}>
                                    <Text style={[home.clientDate, {marginBottom: 10}]}>Number of season tickets sold</Text>
                                    <Text style={[home.clientName, {fontSize: 32, fontWeight: '600', lineHeight: 38, marginBottom: 0, alignSelf: 'center', textAlign: 'center'}]}>{filteredPayments.length}</Text>
                                </View>

                            </View>

                            {
                                filteredPayments.map((item, i) => (
                                    <View key={i} style={home.clientCard}>
                                        <Text style={home.clientName}>{item.clientName}</Text>
                                        <Text style={home.label}>Date</Text>
                                        <Text style={home.clientDate}>{item.date}</Text>
                                        <View style={[common.row, {justifyContent: 'space-between'}]}>
                                            <Text style={[home.clientName, {fontSize: 25, fontWeight: '600', lineHeight: 28, marginBottom: 0}]}>{item.amount} {selectedCurrency.sign}</Text>
                                            <View style={[form.typeBtn, {backgroundColor: '#01068F', width: 'content', alignSelf: 'flex-end', marginBottom: 0}]}>
                                                <Text style={[form.typeBtnText, {fontSize: 14}]}>{item.type}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }

                        </View>
                    ) : (
                            <View style={{width: '100%'}}>
                                <Image
                                    source={fundelur3}
                                    style={onboarding.image}
                                />
                                <Text style={home.noText}>You haven't added the data yet</Text>
                            </View>
                    )
                }

                <TouchableOpacity style={[common.button, {marginTop: 20}]} onPress={() => navigation.navigate('Fundeluraddpayment')}>
                    <Text style={common.buttonText}>Add payment</Text>
                </TouchableOpacity>

                {
                    fundelurPayments.length > 0 && (
                        <TouchableOpacity style={[common.button, {marginTop: 10, backgroundColor: '#fff'}]} onPress={exportReport}>
                            <Text style={[common.buttonText, {color: '#0900FF'}]}>Export report</Text>
                        </TouchableOpacity>
                    )
                }

                <View style={{height: 150}} />
            </ScrollView>

        </View>
    )
};

export default Fundelurreports;