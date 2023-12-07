import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import QrScan from "./screens/QrScan";
import StudentDetailsScreen from "./screens/StudentDetailsScreen";
import PayScreen from "./screens/PayScreen";
import StudentsHome from "./screens/StudentsHome";
import CreateStudent from "./screens/CreateStudent";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StudentsHome"
          component={StudentsHome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PayScreen"
          component={PayScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StudentDetailsScreen"
          component={StudentDetailsScreen}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="CreateStudent"
          component={CreateStudent}
          options={{ headerShown: false }}
        />



        <Stack.Screen
          name="QrScan"
          component={QrScan}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
