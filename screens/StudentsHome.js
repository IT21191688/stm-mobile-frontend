import axios from 'axios';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentsHome = () => {
    const navigation = useNavigation();

    const [selectedGrade, setSelectedGrade] = useState('');
    const [studentsDetails, setStudentDetails] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [grade, setGrades] = useState([]);

    useEffect(() => {
        getStudentDetails();
        generateGrades();
    }, []);



    const getStudentDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing in AsyncStorage');
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            //const studentId = await AsyncStorage.getItem('studentId');

            const response = await axios.get(
                'https://stm-backend.onrender.com/api/v1/student/getAllStudentDetails',
                { headers }
            );

            if (response.data.isSuccessful) {
                setStudentDetails(response.data.data);
                //console.log("studentDetails Success", response.data.data);
                //return response.data.data; // Return the data on success
            } else {
                throw new Error("Failed to get student details: " + response.data.message);
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
            throw error; // Re-throw the error to maintain the rejected Promise
        }
    };


    const handleStudentPress = (studentId) => {

        navigation.navigate('StudentDetailsScreen', { studentId });


    };


    const handleSearch = (text) => {
        setSearchText(text);
        // Filter the studentsDetails array based on the email
        const filteredStudents = studentsDetails.filter(student =>
            student.email.toLowerCase().includes(text.toLowerCase())
        );
        setStudentDetails(filteredStudents);
    };

    const handleGradeChange = (value) => {
        setSelectedGrade(value);
        // Filter students based on the selected grade
        const filteredStudents = studentsDetails.filter(student =>
            student.grade === `Grade ${value}`
        );
        setStudentDetails(filteredStudents);
    };

    const generateGrades = () => {
        const grades = [];
        for (let i = 1; i <= 13; i++) {
            grades.push({ id: `${i}`, grade: `Grade ${i}` });
        }
        setGrades(grades);
    };


    const handleAttendance = () => {


        navigation.navigate('QrScan')


    }

    const handleStudentDetails = () => {


        navigation.navigate('StudentDetailsScreen')


    }


    handleCreateStudent = () => {

        navigation.navigate('CreateStudent')

    }



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.studentClass} onPress={() => handleStudentPress(item._id)}>
                <Text style={styles.studentName}>{item.firstname} {item.lastname}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Grade:</Text>
                    <Text style={styles.infoText}>{item.grade}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Age:</Text>
                    <Text style={styles.infoText}>{item.age}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Payment Type:</Text>
                    <Text style={styles.infoText}>{item.paymentType}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        );
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

                <View style={styles.searchContainer}>

                    <View style={styles.inputContainer}>

                        <Image
                            style={styles.searchImage}
                            contentFit="cover"
                            source={require("../assets/search.png")}

                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={handleSearch}
                        />

                    </View>



                    <View style={styles.rowContainer}>

                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedGrade}
                                onValueChange={handleGradeChange}
                            >
                                {grade.map((gradeItem) => (
                                    <Picker.Item
                                        style={styles.pickerItem}
                                        key={gradeItem.id}
                                        label={gradeItem.grade}
                                        value={gradeItem.id}
                                    />
                                ))}
                            </Picker>
                        </View>


                    </View>


                    <TouchableOpacity style={styles.createNewStudent} onPress={handleCreateStudent}>
                        <Text style={styles.createStudentText}>Create Student</Text>
                    </TouchableOpacity>


                </View>

                <View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.studentClassContainer}
                        data={studentsDetails}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />

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
    searchContainer: {
        width: '100%',
        height: '38%',
        borderRadius: 30,
        backgroundColor: '#E5800A',
        padding: 10
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: 'center',
        marginTop: '6%',
        borderWidth: 0.4,
        borderRadius: 20,
        paddingHorizontal: '4%',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center'
    },
    input: {
        height: 50,
        padding: 5
    },
    searchImage: {
        width: 24,
        height: 24,
        flexShrink: 0,
    },
    pickerContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        overflow: 'hidden',
        width: '90%',
        flexDirection: 'row',

    },
    picker: {
        width: "100%",
        height: 50,
        borderColor: "#AAA6B9",
        backgroundColor: '#fff'
    },
    pickerItem: {
        color: '#6B6060',
        fontSize: 14
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    createNewStudent: {
        width: 291,
        height: 39,
        borderRadius: 20,
        backgroundColor: '#E0C6C6',
        top: 10
        // Add other styles for positioning, shadows, etc., if needed
    },
    createStudentText: {

        textAlign: 'center',
        top: 5,
        fontSize: 17,
        fontWeight: '800'

    },

    studentClassContainer: {
        paddingTop: 30,

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
    studentClass1: {
        width: '100%',
        height: 150, // Adjust the height to 50% of the parent height (300 / 2 = 150)
        backgroundColor: '#D4D7F5',
        borderRadius: 20,
        paddingBottom: 20,
        marginBottom: 10,
        padding: 10
        // Other styles for the student class container can be added here
    },

    studentClass: {
        width: '100%',
        backgroundColor: '#D4D7F5',
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
    },
    studentName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoText: {
        flex: 1,
    },


});

export default StudentsHome;
