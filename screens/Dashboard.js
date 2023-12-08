import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const navigation = useNavigation();



    const handleAttendance = () => {


        navigation.navigate('QrScan')


    }

    const handleStudentDetails = () => {


        navigation.navigate('StudentsHome')


    }

    const handleTeacher = () => {


        navigation.navigate('StudentDetailsScreen')


    }


    const handleLogout = async () => {

        try {

            await AsyncStorage.clear();
            Alert.alert("Logout Success")
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error while logging out:', error);
        }


    }



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

                <Text style={styles.dashBoardText}>Dashboard</Text>

                <View style={styles.rowBoxes}>

                    <TouchableOpacity style={styles.box} onPress={handleAttendance}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/attendance.png")}
                        />
                        <Text style={styles.text}>Mark         Attendance</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.box} onPress={handleStudentDetails}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/knowledge.png")}
                        />
                        <Text style={styles.text}>Student Management</Text>

                    </TouchableOpacity>

                </View>


                <View style={styles.rowBoxes}>

                    <TouchableOpacity style={styles.box} onPress={handleTeacher}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/computer.png")}
                        />
                        <Text style={styles.text}>Teacher Management</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.box}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/presentation.png")}
                        />
                        <Text style={styles.text}>Class        Management</Text>

                    </TouchableOpacity>

                </View>


                <View style={styles.rowBoxes}>

                    <TouchableOpacity style={styles.box}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/payment-gateway.png")}
                        />
                        <Text style={styles.text}>Payment Management</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.box} onPress={handleLogout}>

                        <Image
                            style={styles.image}
                            contentFit="cover"
                            source={require("../assets/payment-gateway.png")}
                        />
                        <Text style={styles.text}>LogOut</Text>

                    </TouchableOpacity>



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
    rowBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
    },
    dashBoardText: {
        color: '#150A33',
        //fontFamily: 'DM Sans',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        //lineHeight: 'normal',
        // Additional styles for the dashboard text if required
    },
    box: {
        width: '47%',
        height: 150,
        flexShrink: 0,
        borderRadius: 25,
        backgroundColor: '#E5670B',
        padding: 5
    },
    image: {

        width: '50%',
        height: '50%',
        left: '24%',
        top: 15
    },
    text: {

        color: '#fff',
        top: 25,
        textAlign: 'center'

    }
});

export default Dashboard;
