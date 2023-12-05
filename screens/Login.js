import React, { useState } from "react";
import { Image } from "expo-image";
import axios from 'axios';
import { StyleSheet, Pressable, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
//rimport fonts from "../assets/fonts"
//import { CheckBox } from 'react-native-elements';
//import { useNavigation } from "@react-navigation/native";
//import { FontFamily } from "../GlobalStyles";
//import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {




    return (
        <>

            <View>
                <Text style={styles.customText}>Welcome</Text>
            </View>







        </>

    );
};

const styles = StyleSheet.create({

    customText: {
        color: '#F56513',
        // fontFamily: FontFamily.dMSansBold,
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
    },

});


export default Login;
