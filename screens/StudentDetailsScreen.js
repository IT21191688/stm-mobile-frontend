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
            await getClassDetails();


            await filteringClassDetails();
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
            } else {
                throw new Error("Failed to get student details: " + response.data.message);
            }
        } catch (error) {
            throw new Error('Error fetching student details:', error);
        }
    };

    const getClassDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing in AsyncStorage');
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get(
                `https://stm-backend.onrender.com/api/v1/class/getAllClassdetails`,
                { headers }
            );

            if (response.data.isSuccessful) {
                setClassDetails(response.data.data);
            } else {
                throw new Error("Failed to get class details: " + response.data.message);
            }
        } catch (error) {
            throw new Error('Error fetching class details:', error);
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

            const classes = studentDetails.classes;

            const classAttendancePromises = classes.map(async (classId) => {
                try {
                    const response = await axios.get(
                        `https://stm-backend.onrender.com/api/v1/attendance/getAttendance/${studentId}/${classId}/${month}/${year}`,
                        { headers }
                    );

                    console.log("Response for classId:", classId, response.data.data);

                    if (response.data.isSuccessful) {
                        const attendId = response.data.data.length > 0 ? response.data.data[0]._id : null;
                        return { classId, days: response.data.data.length > 0 ? response.data.data[0].days : [], attendId: attendId };
                    } else {
                        return { classId, days: [], attendId: null };
                    }
                } catch (error) {
                    console.error('Error fetching attendance for class', classId, ':', error);
                    return { classId, days: [], attendId: null };
                }
            });

            const classAttendanceResults = await Promise.all(classAttendancePromises);

            console.log("Attendance Results:", classAttendanceResults);

            const updatedFilteredClassDetails = assignedClassDetails.map((classDetail) => {
                console.log("classDetails " + classDetail._id)
                const foundAttendance = classAttendanceResults.find((attendance) => attendance.classId == classDetail._id);

                console.log("found attendance", foundAttendance);
                if (foundAttendance) {
                    return { ...classDetail, atendId: foundAttendance.attendId, days: foundAttendance.days };
                }
                return classDetail;
            });

            console.log("FilteredData", updatedFilteredClassDetails);

            setFilteredClassDetails(updatedFilteredClassDetails);
            console.log(filteredClassDetails);
        } catch (error) {
            throw new Error('Error getting student attendance:', error.message);
        }
    };


    const filteringClassDetails = async () => {
        try {
            if (studentDetails && studentDetails.classes && classDetails.length > 0) {
                const classes = studentDetails.classes;

                const classPromises = classes.map(async (classId) => {
                    const foundClass = classDetails.find((classDetail) => classDetail._id === classId);
                    return foundClass;
                });

                const assignedClasses = await Promise.all(classPromises);
                setAssignedClassDetails(assignedClasses);
                console.log("assigned classes" + assignedClassDetails);
            }
        } catch (error) {
            console.error('Error in filteringClassDetails:', error);
        }
    };

    const handleAttendance = () => {




    };

    const handleEdit = () => {

        navigation.navigate("EditStudent")


    }

    const handlePayment = () => {

        navigation.navigate('PayScreen')
    }

    //console.log(filteredClassDetails)
    const sampleData = [
        {
            "__v": 0,
            "id": "6569a5840ab3f01da08d8b85",
            "atendId": "6573318d0b3ba40c3f82b3e2",
            "classGrade": "Grade 11",
            "className": "Science",
            "createdAt": "2023-12-01T09:21:08.724Z",
            "days": [0.1],
            "price": 1000,
            "teacherName": "John Doe",
            "updatedAt": "2023-12-01T09:33:54.671Z"
        },
        // Add more items following the same structure if needed
    ];

    //console.log("=================" + sampleData);

    const renderItem = ({ item }) => (
        <View style={styles.studentClass}>
            <Text style={styles.studentText}>{item.className}</Text>
            <Text style={styles.studentText}>{item.classGrade}</Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.3}
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
