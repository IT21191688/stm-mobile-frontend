import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';

const CreateStudent = () => {
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedClasses, setSelectedClasses] = useState([]);

    const handleClassChange = (value) => {
        if (value !== "Select Class") {
            setSelectedClasses([...selectedClasses, value]);
        }
    };


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
    }, []);

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

                <Text>Create Student</Text>

                <ScrollView style={styles.inputContainerScroller}>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sadeepa"
                            placeholderTextColor="rgba(13, 1, 64, 0.6)"
                            onChangeText={text => setEmail(text)}
                        />

                    </View>

                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
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
                            onChangeText={text => setEmail(text)}
                            keyboardType="numeric"
                        />

                    </View>

                    {/*Grade section Should update*/}
                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Grade</Text>
                        <Picker
                            style={styles.picker}
                            //selectedValue={selectedPaymentType}
                            onValueChange={(value) => handlePaymentTypeChange(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Grade" value="Full Pay" />
                        </Picker>


                    </View>


                    <View style={styles.inputContainer}>

                        <Text style={styles.inputLabel}>Select Class</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={"Select Class"} // Provide a selectedValue for the Picker
                            onValueChange={(value) => handleClassChange(value)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Select Class" value="Select Class" />
                            <Picker.Item style={styles.pickerItem} label="Class A" value="Class A" />
                            <Picker.Item style={styles.pickerItem} label="Class B" value="Class B" />
                            {/* Add other class options as Picker.Item */}
                        </Picker>

                    </View>


                    <View style={styles.inputContainer}>

                        <View style={styles.selectedClassesContainer}>
                            <Text>Selected Classes:</Text>
                            {selectedClasses.map((classItem, index) => (
                                <TouchableOpacity key={index} onPress={() => removeClass(index)}>
                                    <Text>{classItem}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                        <TouchableOpacity onPress={selectImage}>
                            <Text>Select Image</Text>
                        </TouchableOpacity>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                        )}
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

});

export default CreateStudent;
