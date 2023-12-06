import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ProgressBarAndroid, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";


const StudentDetailsScreen = () => {
    const navigation = useNavigation();


    const [selectedPaymentType, setSelectedPaymentType] = useState('Full Pay');

    const handlePaymentTypeChange = (value) => {
        setSelectedPaymentType(value);

        // You can perform actions or state updates based on the selected payment type here
    };


    const handlePay = () => {
        // Handle the payment action when the button is pressed
    };

    const handleCancel = () => {
        // Handle the cancel action when the button is pressed
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

                <View style={styles.studentDetailsContainer}>


                    <Text style={styles.studentDetailsText}>Student Details</Text>

                    <Image
                        style={styles.studentProfileImage}
                        contentFit="cover"
                        source={require("../assets/profileimg.png")}
                    />

                    <Text style={styles.studentNameText}>Sadeepa Lakshan</Text>
                    <Text style={styles.studentGradeText}>Grade 10</Text>

                </View>



                <View style={styles.paymentContainer}>

                    <Text style={styles.paymentDetailsText}>Payment Details</Text>

                    <Text style={styles.paymentDateText}>
                        2023/4
                    </Text>


                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Student Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sadeepa Lakshan"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setEmail(text)}
                        />

                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Class Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class Name"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setEmail(text)}
                        />

                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Payment Type</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedPaymentType}
                            onValueChange={(value) => handlePaymentTypeChange(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Full Pay" value="Full Pay" />
                            <Picker.Item style={styles.pickerItem} label="Half Pay" value="Half Pay" />
                        </Picker>


                    </View>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                            <Text style={styles.payButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                            <Text style={styles.payButtonText}>Pay</Text>
                        </TouchableOpacity>


                    </View>


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

    },
    profileImage: {

        width: 60,
        height: 60,
        left: '75%',
        top: '15%'

    },
    studentDetailsContainer: {
        width: '100%',
        height: '25%',
        flexShrink: 0,
        borderRadius: 15,
        backgroundColor: '#E5800A'
    },
    studentDetailsText: {
        color: '#150A33',
        // fontFamily: 'DM Sans',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        padding: '3%'

    },
    studentProfileImage: {
        width: 54,
        height: 54,
        flexShrink: 0,
        left: 10

    },
    studentNameText: {
        color: '#0E0505',
        //fontFamily: 'Poppins',
        fontSize: 19,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 26.4,
        letterSpacing: -0.33,
        left: '30%',
        top: '-40%'
    },
    studentGradeText: {

        color: '#0E0505',
        //fontFamily: 'Poppins',
        fontSize: 19,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 26.4,
        letterSpacing: -0.33,
        left: '30%',
        top: '-30%'

    },
    paymentContainer: {
        width: '100%',
        height: '80%',
        top: 5,
        flexShrink: 0,
        backgroundColor: '#DDD9D9',
        elevation: 8, // For Android drop shadow (simulates elevation)
        shadowColor: '#999', // For iOS drop shadow (simulates elevation)
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 62,
        borderRadius: 15,
    },
    paymentDetailsText: {
        color: '#150A33',
        // fontFamily: 'DM Sans',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        padding: 10

    },
    paymentDateText: {
        width: '40%',
        height: '8%',
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#9094F4',
        color: '#150B3D',
        textAlign: 'center',
        // fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
        padding: 8,
        left: '55%',
        top: '-8%'
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: 'center',
        marginTop: '6%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: '4%',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center'
    },
    input: {
        height: 50,
        padding: 5
    },
    inputLabel: {
        position: "absolute",
        fontSize: 12,
        color: "rgba(13, 1, 64, 0.6)",
        top: '-40%',
        left: '1%',
        color: '#6B6060'
    },
    pickerContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        width: "100%",
        height: 50,
        borderColor: "#AAA6B9",
    },
    pickerItem: {
        color: '#6B6060',
        fontSize: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        top: 15
    },
    payButton: {
        width: 101,
        height: 39,
        borderRadius: 20,
        backgroundColor: '#E5670B',
        justifyContent: 'center',
        alignItems: 'center',
        // Add other styles for positioning, shadows, etc., if needed
    },
    payButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        // Add other text styles if needed
    },
    cancelBtn: {
        width: 101,
        height: 39,
        borderRadius: 20,
        backgroundColor: '#EA1649',
        justifyContent: 'center',
        alignItems: 'center',
        // Add other styles for positioning, shadows, etc., if needed
    },
});

export default StudentDetailsScreen;
