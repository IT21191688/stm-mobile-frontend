import axios from 'axios';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QrScan = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        handleScan(type, data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleScan = async (type, data) => {
        if (type === 256) {
            try {
                //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4YjFmZjlkZTcyYWNhNjY2ODA5YTIiLCJlbWFpbCI6InNhZGVlcGFsYWtzaGFuMDgwNEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwMTUwNDIsImV4cCI6MTcwMjYxOTg0Mn0.eUCGCMZJm3EjBRfX2z5WjmjCcxOkiGQI5qfww2cT8DA"

                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing in AsyncStorage');
                    return;
                }
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };


                const response = await axios.get(
                    `https://stm-backend.onrender.com/api/v1/student/getStudentDetails/${data}`,
                    { headers }
                );

                if (response.data.isSuccessful) {

                    saveStudentId(response.data.data._id)
                    Alert.alert("Scan Success");
                    navigation.navigate("StudentDetailsScreen")
                } else {
                    Alert.alert("Failed Try Again: " + response.data.message);
                    navigation.navigate("Dashboard")
                }
            } catch (error) {
                console.error('Error creating student:', error);
                Alert.alert("Failed Try again" + error.message);
            }


        }


    };


    const saveStudentId = async (studentId) => {
        try {
            await AsyncStorage.setItem("studentId", studentId);
            console.log("Student ID saved successfully:", studentId);
        } catch (error) {
            console.error("Error saving student ID:", error);
        }
    };

    return (

        <>
            <View style={styles.heading}>

                <Text style={styles.profileName}>
                    John Joe
                </Text>

                <Image
                    style={styles.profileImage}
                    contentFit="cover"
                    source={require("../assets/profileimg.png")}
                />

            </View>
            <View style={styles.container}>

                <View style={styles.qrScanContainer}>
                    <Text style={styles.QrScanText}>Scan student QR HERE!</Text>
                    <Image
                        style={styles.QrScanImage}
                        contentFit="cover"
                        source={require("../assets/qr-code.png")}
                    />

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={styles.qrScreen}
                    />
                    {scanned && (
                        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
                            <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F9F9",
        flex: 1,
        paddingHorizontal: '7%',
        paddingTop: '4%',
    },
    heading: {
        top: 0,
        width: '100%',
        height: '20%',
        flexShrink: 0,
        backgroundColor: '#E5670B',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    profileName: {
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#fff',
        top: '40%',
        left: '10%'
        // Additional styles for the profile name text if required
    },
    profileImage: {

        width: 60,
        height: 60,
        left: '75%',
        top: '15%'

    },
    qrScanContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    QrScanText: {
        color: "#150A33",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },
    QrScanText: {
        color: '#150A33',
        //fontFamily: 'DM Sans',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center'
        // Additional styles for the QR scan text if required
    },
    QrScanImage: {
        width: 94,
        height: 102,
        flexShrink: 0,
    },
    scanAgainButton: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: 15,
        borderRadius: 10,
    },
    scanAgainText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#150A33",
        textAlign: "center",
    },
    qrScreen: {

        width: '60%',
        height: '60%'
    }
});

export default QrScan;
