import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const StudentsHome = () => {
    const navigation = useNavigation();

    const [selectedGrade, setSelectedGrade] = useState('');

    const handleGradeChange = (value) => {
        setSelectedGrade(value);
        // Perform actions or state updates based on the selected grade here
    };

    const grade = [
        { id: '1', grade: 'Grade 1' },
        { id: '2', grade: 'Grade 2' },
        { id: '3', grade: 'Grade 3' },
        // Add more grades as needed
    ];


    const data = [
        { id: '1', text: 'Mathematics' },
        { id: '2', text: 'Science' },
        { id: '3', text: 'History' },
        { id: '4', text: 'Geography' },
        { id: '5', text: 'English' },
        { id: '6', text: 'English' },
        // Add more data as needed
    ];


    const handleAttendance = () => {


        navigation.navigate('QrScan')


    }

    const handleStudentDetails = () => {


        navigation.navigate('StudentDetailsScreen')


    }


    handleCreateStudent = () => {

        navigation.navigate('CreateStudent')

    }



    const renderItem = ({ item }) => (
        <View style={styles.studentClass}>
            <Text style={styles.studentText}>{item.text}</Text>
            <Text style={styles.studentText}>Grade 10</Text>
            <Text style={styles.studentText}>Grade 10</Text>



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
                            onChangeText={text => setEmail(text)}
                        />

                    </View>



                    <View style={styles.rowContainer}>

                        <View style={styles.pickerContainer}>

                            <Picker
                                style={styles.picker}
                                selectedValue={selectedGrade}
                                onValueChange={(value) => handlePaymentTypeChange(value)}
                            >
                                {grade.map((gradeItem) => (
                                    <Picker.Item style={styles.pickerItem}
                                        key={gradeItem.id}
                                        label={gradeItem.grade}
                                        value={gradeItem.id}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.pickerContainer}>

                            <Picker
                                style={styles.picker}
                                selectedValue={selectedGrade}
                                onValueChange={(value) => handlePaymentTypeChange(value)}
                            >
                                {grade.map((gradeItem) => (
                                    <Picker.Item style={styles.pickerItem}
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
                        data={data}
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
        width: '46%',
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


});

export default StudentsHome;
