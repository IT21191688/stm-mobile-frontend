import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoadingPage = () => {


    const navigation = useNavigation();

    useEffect(() => {
        const checkCredentials = async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                const password = await AsyncStorage.getItem('password');

                if (email && password) {
                    // If credentials exist, navigate to Dashboard
                    navigation.navigate('Dashboard');
                } else {
                    // Navigate to Login screen if credentials not found
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('Error checking credentials:', error);
                // Navigate to Login screen if an error occurs
                navigation.navigate('Login');
            }
        };

        checkCredentials();
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            {/* Optional: Show a loading indicator while checking credentials */}
        </View>
    );
};

export default LoadingPage;
