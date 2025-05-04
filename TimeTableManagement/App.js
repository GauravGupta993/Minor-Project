import { View, Text } from "react-native";
import React from "react";
import "nativewind/types.d";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import OTPVerification from "./components/OTPVerification";
import MainScreen from "./components/MainScreen";
import StudentMainScreen from "./components/StudentMainScreen";
import ImportTimetablePage from "./components/TimeTableImport"
import TimeTableScreen from "./components/TimeTable";
import EmptyRoomFinder from "./components/EmptyRoom";
import StudentHomePage from "./components/StudentHomepage";
import MainHomePage from "./components/MainHomePage";
import RoomLocationsPage from "./components/RoomLocation";
import BookAppointmentScreen from "./components/BookAppointments";
import TeacherAppointmentsScreen from "./components/TeacherAppointments";
import StudentAppointmentsScreen from "./components/StudentAppointments";

// import "./global.css"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainHomePage}
          options={{ headerBackVisible: false, title: "Home" }}
        />
        <Stack.Screen
          name="Homepage"
          component={HomePage}
          options={{
            headerBackVisible: false,
            title: "Teacher Authentication",
          }}
        />
        <Stack.Screen
          name="StudentHomepage"
          component={StudentHomePage}
          options={{ headerBackVisible: false, title: "Student Home Page" }}
        />
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
        <Stack.Screen
          name="StudentMainScreen"
          component={StudentMainScreen}
          options={{ headerBackVisible: false, title: "Student MainScreen" }}
        />
        <Stack.Screen
          name="BookAppointment"
          component={BookAppointmentScreen}
          options={{ headerBackVisible: false, title: "Book Appointment" }}
        />
        <Stack.Screen
          name="TeacherAppointment"
          component={TeacherAppointmentsScreen}
          options={{ headerBackVisible: false, title: "Teacher Appointments" }}
        />
        <Stack.Screen
          name="StudentAppointment"
          component={StudentAppointmentsScreen}
          options={{ headerBackVisible: false, title: "Student Appointments" }}
        />
        <Stack.Screen name="TimeTableImport" component={ImportTimetablePage} />
        <Stack.Screen
          name="TimeTable"
          component={TimeTableScreen}
          options={{ headerBackVisible: false, title: "Time Table Reader" }}
        />
        <Stack.Screen
          name="EmptyRoom"
          component={EmptyRoomFinder}
          options={{ headerBackVisible: false, title: "Find Empty Rooms" }}
        />
        <Stack.Screen
          name="RoomLocation"
          component={RoomLocationsPage}
          options={{ headerBackVisible: false, title: "Room Locations" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
