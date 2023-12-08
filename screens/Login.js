import axios from 'axios';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "react-native-elements/dist/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLoginPress = async () => {
        try {
            const response = await axios.post('https://stm-backend.onrender.com/api/v1/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { data } = response.data;

                if (data.token) {
                    await AsyncStorage.setItem('token', data.token);
                } else {
                    console.error('Token is missing or undefined');
                }

                if (data.user && data.user.role) {
                    await AsyncStorage.setItem('role', data.user.role);
                    if (data.user.role === 'admin') {

                        if (rememberMe === true) {
                            await AsyncStorage.setItem('email', email);
                            await AsyncStorage.setItem('password', password);

                        }

                        Alert.alert('Success', 'Login successful');
                        navigation.navigate('Dashboard');
                    } else {
                        Alert.alert('UnSuccess', 'Login Unsuccessful');
                        navigation.navigate('Login');
                    }
                } else {
                    console.error('User role is missing or undefined');
                }

            } else {

                Alert.alert('Unsuccessful', 'Login Unsuccessful');
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {

            Alert.alert('Unsuccessful', 'Login Unsuccessful');
            console.error('Login error:', error);
        }
    };


    const fogotPassword = () => {
        // ... (your forgot password logic)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>
            {/* Additional text */}
            <Text style={styles.additionalText}>SASIP S.M.S</Text>

            {/* Email Input */}
            <View style={styles.inputFields}>
                <View style={styles.inputContainer}>

                    <Text style={styles.inputLabel}>User Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="hello@gmail.com"
                        placeholderTextColor="rgba(13, 1, 64, 0.6)"
                        onChangeText={text => setEmail(text)}
                    />

                </View>

                {/* Password Input */}

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="rgba(13, 1, 64, 0.6)"
                        onChangeText={text => setPassword(text)}
                    />

                </View>

            </View>

            <View style={styles.rememberFogot}>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        checked={rememberMe}
                        onPress={() => setRememberMe(!rememberMe)}
                        checkedColor="#e6e1ff"
                        containerStyle={styles.checkboxLayout}
                    />
                    <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>

                {/* Forgot Password */}



            </View>

            {/* Remember Me Checkbox */}


            {/* Login Button */}
            <View style={styles.loginButtonFull}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                    <View style={styles.loginButtonInner} />
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

            </View>


            <TouchableOpacity style={styles.forgotPassword} onPress={fogotPassword}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingHorizontal: '7%',
        paddingTop: '10%',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: '3%',
        color: "#F56513",
        marginTop: '30%'
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: 'center',
        marginTop: '8%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: '4%',

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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        borderRadius: 4,
        backgroundColor: "#F0F0F0",
    },
    checkboxLabel: {
        right: 12,
    },
    forgotPassword: {
        marginTop: '5%',
        left: '30%'
    },
    loginButton: {
        marginTop: 0,
        backgroundColor: '#F56513',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    loginButtonInner: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    loginText: {
        fontSize: 16,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: "#FFFFFF",
        paddingTop: 12,
        paddingBottom: 15,
    },
    additionalText: {
        marginTop: '5%',
        fontSize: 22,
        textAlign: "center",
        color: "#333333",
        fontWeight: '600',
        color: '#6B6060'
    },
    inputFields: {
        padding: '4%'
    }
    ,
    rememberFogot: {

        flexDirection: "row",
        marginTop: 3,


    },
    loginButtonFull: {

        padding: '4%'


    }
});

export default Login;
