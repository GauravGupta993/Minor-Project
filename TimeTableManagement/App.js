import { View, Text } from "react-native";
import React from "react";
import "nativewind/types.d";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import OTPVerification from "./components/OTPVerification";
import MainScreen from "./components/MainScreen";
import UploadImage from "./components/ImageUpload";
import TimeTableScreen from "./components/TimeTable";
// import "./global.css"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={HomePage} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerBackVisible: false, title: "Signup" }}
          />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerBackVisible: false, title: "Login" }}
          />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{ headerBackVisible: false, title: "OTP Verification" }}
          />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerBackVisible: false, title: "MainScreen" }}
          />
          <Stack.Screen name="UploadImage" component={UploadImage} />
          <Stack.Screen name="TimeTable" component={TimeTableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
