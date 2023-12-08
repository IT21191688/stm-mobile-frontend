import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import QrScan from "./screens/QrScan";
import StudentDetailsScreen from "./screens/StudentDetailsScreen";
import PayScreen from "./screens/PayScreen";
import StudentsHome from "./screens/StudentsHome";
import CreateStudent from "./screens/CreateStudent";
import EditStudent from "./screens/EditStudent";
import LoadingPage from "./screens/LoadingPage";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    checkCredentials();
  }, []);

  const checkCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email && password) {
        // If credentials exist, navigate to Dashboard
        navigation.replace('Dashboard');
      } else {
        // Navigate to Login screen if credentials not found
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
      // Navigate to Login screen if an error occurs
      navigation.replace('Login');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="StudentsHome" component={StudentsHome} />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="StudentDetailsScreen" component={StudentDetailsScreen} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="CreateStudent" component={CreateStudent} />
        <Stack.Screen name="QrScan" component={QrScan} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
