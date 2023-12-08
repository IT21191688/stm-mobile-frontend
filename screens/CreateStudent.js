import axios from 'axios';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateStudent = () => {
    const navigation = useNavigation();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [payment, setPayment] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedClasses, setSelectedClasses] = useState([]);


    const [filteredClasses, setFilteredClasses] = useState([])


    const [classData, setClassData] = useState([])

    const handleClassChange = (value) => {
        if (value !== "Select Class") {
            setSelectedClasses([...selectedClasses, value]);
            // console.log(selectedClasses)
        }
    };
    const grades = [
        { id: 1, name: 'Grade 1' },
        { id: 2, name: 'Grade 2' },
        { id: 3, name: 'Grade 3' },
        { id: 4, name: 'Grade 4' },
        { id: 5, name: 'Grade 5' },
        { id: 6, name: 'Grade 6' },
        { id: 7, name: 'Grade 7' },
        { id: 8, name: 'Grade 8' },
        { id: 9, name: 'Grade 9' },
        { id: 10, name: 'Grade 10' },
        { id: 11, name: 'Grade 11' },
        { id: 12, name: 'Grade 12' },
        { id: 13, name: 'Grade 13' },
    ];

    const removeClass = (index) => {
        const updatedClasses = selectedClasses.filter((_, i) => i !== index);
        setSelectedClasses(updatedClasses);

    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();

        getClassDetails()

    }, []);

    const getClassDetails = async () => {
        //setIsLoading(true); // Set loading to true

        try {

            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4YjFmZjlkZTcyYWNhNjY2ODA5YTIiLCJlbWFpbCI6InNhZGVlcGFsYWtzaGFuMDgwNEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDE5NzMxMDYsImV4cCI6MTcwMjU3NzkwNn0.de_o7V7FEnfY_Gj-0Xl7je9sw3n8WDwJWjV7QNZcg8o"
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get("https://stm-backend.onrender.com/api/v1/class/getAllClassdetails", { headers });

            if (response.data.isSuccessful) {
                const fetchedData = response.data.data;
                setClassData(fetchedData);
                //console.log(fetchedData)
            } else {
                console.error("Failed to fetch Class Data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching Class Data:", error);
        } finally {
            //setIsLoading(false); 
        }
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImage(result.uri);
            }
        } catch (error) {
            console.error('Image selection error:', error);
        }
    };

    const handleGradeChange = (selectedGrade) => {
        // Filter class data based on the selected grade
        setGrade(selectedGrade)
        const filteredClasses = classData.filter(classItem => classItem.classGrade === selectedGrade);
        // Update the class options based on the selected grade
        setFilteredClasses(filteredClasses);
    };


    const handleSubmit = async () => {

        try {

            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4YjFmZjlkZTcyYWNhNjY2ODA5YTIiLCJlbWFpbCI6InNhZGVlcGFsYWtzaGFuMDgwNEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDE5NzMxMDYsImV4cCI6MTcwMjU3NzkwNn0.de_o7V7FEnfY_Gj-0Xl7je9sw3n8WDwJWjV7QNZcg8o"

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            // Create a request body object with the appointment details
            const requestBody = {
                firstname: firstname,
                lastname: lastname,
                age: age,
                grade: grade,
                email: email,
                profileImage: "profile.jpg",
                role: "user",
                classes: selectedClasses,
                payementType: paymentType,
                status: 1
            };

            const response = await axios.post(
                'https://stm-backend.onrender.com/api/v1/student/sturegister',
                requestBody,
                { headers }
            );

            if (response.data.isSuccessful) {
                Alert.alert("Successfully Created New Student");
                navigation.navigate("Dashboard")
            } else {
                Alert.alert("Failed Try Again: " + response.data.message);
                navigation.navigate("Dashboard")
            }
        } catch (error) {
            console.error('Error creating student:', error);
            Alert.alert("Failed to Create Student: " + error.message);
        }
    };

    // Your cancel function
    const handleCancel = () => {
        navigation.navigate("Dashboard")
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

                <Text style={styles.createStudentText}>Create Student</Text>

                <ScrollView style={styles.inputContainerScroller} showsVerticalScrollIndicator={false}>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sadeepa"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setFirstName(text)}
                        />

                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setLastName(text)}
                        />

                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="hello123@gmail.com"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setEmail(text)}
                        />

                    </View>


                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Age</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="28"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setAge(text)}
                            keyboardType="numeric"
                        />

                    </View>

                    {/*Grade section Should update*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Grade</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={grade}
                            onValueChange={(value) => handleGradeChange(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Select Grade" value="" />
                            {grades.map((gradeItem) => (
                                <Picker.Item
                                    style={styles.pickerItem}
                                    key={gradeItem.id}
                                    label={gradeItem.name}
                                    value={gradeItem.name}
                                />
                            ))}
                        </Picker>
                    </View>


                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Select Class</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={"Select Class"}
                            onValueChange={(value) => handleClassChange(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Select Class" value="Select Class" />
                            {filteredClasses.map((classItem) => (
                                <Picker.Item
                                    key={classItem._id}
                                    label={`${classItem.classGrade} - ${classItem.className}`}
                                    value={classItem._id}
                                />
                            ))}
                        </Picker>
                    </View>



                    <View style={styles.inputContainer}>

                        <View style={styles.selectedClassesContainer}>
                            <Text>Selected Classes:</Text>
                            {selectedClasses.map((classItem, index) => {
                                const selectedClassName = classData.find(item => item._id === classItem)?.className;
                                return (
                                    <TouchableOpacity key={index} onPress={() => removeClass(index)}>
                                        <Text>{selectedClassName}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={selectImage} style={styles.selectionSpace}>
                            <Text>Select Image</Text>
                        </TouchableOpacity>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                        )}
                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Payment Type</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={paymentType} // Provide a selectedValue for the Picker
                            onValueChange={(value) => setPaymentType(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Payment Type" value="Payment Type" />
                            <Picker.Item style={styles.pickerItem} label="Full" value="Full" />
                            <Picker.Item style={styles.pickerItem} label="Half" value="Half" />
                            <Picker.Item style={styles.pickerItem} label="Free" value="Free" />
                            {/* Add other class options as Picker.Item */}
                        </Picker>

                    </View>


                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    </View>




                </ScrollView>

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

    inputContainerScroller: {
        height: 'auto'
    },
    createStudentText: {
        color: '#150A33',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        width: 'auto',
        height: 'auto',
        flexShrink: 0,
    },

    //input fields
    inputContainer: {
        flexDirection: "row",
        //alignItems: "center",
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

    selectedClassesContainer: {
        paddingHorizontal: 20,
    },

    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20
    },
    submitButton: {
        width: '40%',
        height: 50,
        borderRadius: 6,
        backgroundColor: '#E5670B',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 62,
    },
    cancelButton: {
        width: '40%',
        height: 50,
        borderRadius: 6,
        backgroundColor: '#E5670B',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 62,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    selectionSpace: {

        height: 50
    }
});


export default CreateStudent;
