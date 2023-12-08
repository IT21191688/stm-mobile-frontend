import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ProgressBarAndroid, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StudentDetailsScreen = () => {
    const navigation = useNavigation();


    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress updates (you can replace this with your actual logic)
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 0.2;
                return newProgress > 1 ? 0 : newProgress;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const data = [
        { id: '1', text: 'Class Name' },
        { id: '2', text: 'Hello Hello' },
        { id: '3', text: 'Hello Hello' },
        { id: '4', text: 'Hello Hello' },
        // Add more data items as needed
    ];

    const handleAttendance = () => {


    };

    const handleEdit = () => {

        navigation.navigate("EditStudent")


    }

    const handlePayment = () => {

        navigation.navigate('PayScreen')
    }


    const renderItem = ({ item }) => (
        <View style={styles.studentClass}>
            <Text style={styles.studentText}>{item.text}</Text>
            <Text style={styles.studentText}>Grade 10</Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
                style={styles.progressBar}
            />

            <TouchableOpacity style={styles.attendBtn} onPress={handleAttendance}>
                <Text style={styles.buttonText}>Attend</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
                <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>

        </View>
    );


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


                    <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.studentClassContainer}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />


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
    studentClassContainer: {
        paddingTop: 20,
        height: 'auto'
    },

    studentClass: {
        width: '100%',
        height: 150, // Adjust the height to 50% of the parent height (300 / 2 = 150)
        backgroundColor: '#D4D7F5',
        borderRadius: 20,
        paddingBottom: 20,
        marginBottom: 10,
        padding: 10
        // Other styles for the student class container can be added here
    },
    studentText: {

        fontSize: 19,
        fontWeight: '600'

    },
    progressBar: {
        width: '30%',
        top: 30
    },
    attendBtn: {
        width: 101,
        height: 39,
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#12F529',
        justifyContent: 'center',
        alignItems: 'center',
        left: '60%',
        top: '-45%'
    },
    buttonText: {
        color: '#fff', // Text color for the button text
        fontWeight: 'bold', // Adjust the font weight if needed
        fontSize: 16, // Adjust the font size if needed
    },
    payBtn: {
        width: 101,
        height: 39,
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#5261E9',
        justifyContent: 'center',
        alignItems: 'center',
        left: '60%',
        top: '-28%'

    }
    ,
    editBtn: {
        width: 101,
        height: 39,
        flexShrink: 0,
        borderRadius: 20,
        backgroundColor: '#78726B',
        justifyContent: 'center',
        alignItems: 'center',
        left: '60%',
        top: '-48%'

    }
});

export default StudentDetailsScreen;
