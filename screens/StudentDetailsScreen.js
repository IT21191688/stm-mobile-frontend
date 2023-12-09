import axios from 'axios';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ProgressBarAndroid, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentDetailsScreen = () => {
    const navigation = useNavigation();

    const [progress, setProgress] = useState(0);
    const [studentDetails, setStudentDetails] = useState({});
    const [classDetails, setClassDetails] = useState([]);
    const [filteredClassDetails, setFilteredClassDetails] = useState([]);
    const [assignedClassDetails, setAssignedClassDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await getStudentDetails();
            await getStudentAttendance();

        } catch (error) {
            console.error('Error fetching data:', error.message);
            Alert.alert("Failed to fetch data" + error.message);
        }
    };

    const getStudentDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing in AsyncStorage');
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const studentId = await AsyncStorage.getItem('studentId');

            const response = await axios.get(
                `https://stm-backend.onrender.com/api/v1/student/getStudentDetails/${studentId}`,
                { headers }
            );

            if (response.data.isSuccessful) {
                setStudentDetails(response.data.data);
                // console.log("studentDetails Success")
            } else {
                throw new Error("Failed to get student details: " + response.data.message);
            }
        } catch (error) {
            throw new Error('Error fetching student details:', error);
        }
    };


    const getStudentAttendance = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing in AsyncStorage');
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const studentId = await AsyncStorage.getItem('studentId');
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            try {
                const response = await axios.get(
                    `https://stm-backend.onrender.com/api/v1/attendance/getAttendancewithAssignClasses/${studentId}/${month}/${year}`,
                    { headers }
                );

                if (response.data.isSuccessful) {
                    setFilteredClassDetails(response.data.data);

                } else {
                    console.error('Failed to fetch attendance:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching attendance:', error);
            }
        } catch (error) {
            throw new Error('Error getting student attendance:', error.message);
        }
    };


    const handleAttendance = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing in AsyncStorage');
            }

            //console.log(token);
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const today = new Date(); // Get today's date


            const newDate = {
                date: today,
                attended: false // Set to true or false based on the attendance status
            };
            try {
                const response = await axios.patch(
                    `https://stm-backend.onrender.com/api/v1/attendance/updateAttendance/${id}`,
                    { newDate },
                    { headers }
                );

                if (response.data.isSuccessful) {

                    getStudentAttendance();
                    // console.log('Attendance updated successfully:', response.data.data);
                    // You might want to update state or perform other operations here
                } else {
                    console.error('Failed to update attendance:', response.data.message);
                }
            } catch (error) {
                console.error('Error updating attendance:', error);
            }
        } catch (error) {
            throw new Error('Error getting student attendance:', error.message);
        }
    };


    const handleEdit = () => {

        navigation.navigate("EditStudent")


    }

    const handlePayment = () => {

        navigation.navigate('PayScreen')
    }

    const calculateProgress = (daysLength) => {
        if (daysLength === 0) {
            return 0; // If no days recorded, progress is 0
        } else {
            const MAX_DAYS = 5
            // Calculate progress based on the length of days array
            //Alert.alert(Math.min(1, daysLength / MAX_DAYS))
            return Math.min(1, daysLength / MAX_DAYS); // Ensure the progress does not exceed 1
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.studentClass}>
            <Text style={styles.studentText}>{item.className}</Text>
            <Text style={styles.studentText}>{item.classGrade}</Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={calculateProgress(item.attendance.days.length)}
                style={styles.progressBar}
            />
            <TouchableOpacity style={styles.attendBtn} onPress={() => handleAttendance(item.attendance._id)}>
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
                    {studentDetails.firstname + " " + studentDetails.lastname}
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
                        source={require("../assets/profileimg.png") || studentDetails.profileImage}
                    />



                    <Text style={styles.studentNameText}>{studentDetails.firstname + " " + studentDetails.lastname}</Text>
                    <Text style={styles.studentGradeText}>{studentDetails.grade}</Text>


                    <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.studentClassContainer}
                    data={filteredClassDetails}
                    keyExtractor={(item) => item._id}
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
