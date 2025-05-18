import React, { useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          const storedName = await AsyncStorage.getItem('name');
          const storedRole = await AsyncStorage.getItem('role');
          const storedsid = await AsyncStorage.getItem('sid');
          console.log(storedEmail);
          console.log(storedName);
          console.log(storedRole);
          console.log(storedsid);
          if (storedEmail) {
            if(storedRole === "student") {
              navigation.navigate("StudentMainScreen");
            } else {
              navigation.navigate('MainScreen');
            }
          }
        } catch (error) {
          console.error('Error retrieving email:', error);
        }
      };

      checkToken();
    }, [navigation])
  );

  // Logout function: clears storage and navigates back to Homepage
  const handleLogout = async () => {
    try {
      // Remove the token (email) from storage
      await AsyncStorage.removeItem('email');
      // Navigate to the Homepage or Login screen as per your flow
      navigation.navigate('Main');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  // Set the header's right component to include the logout button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
          <Text style={{ color: 'blue', fontWeight: '600' }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
   <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-vector/geometric-background_53876-115958.jpg?semt=ais_hybrid&w=740' }} // Replace with your desired image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('TimeTableImport')}
        >
          <Text style={styles.buttonText}>Upload Time Table</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF9800' }]}
          onPress={() => navigation.navigate('EmptyRoom')}
        >
          <Text style={styles.buttonText}>Show Empty Rooms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#9C27B0' }]}
          onPress={() => navigation.navigate('TimeTable')}
        >
          <Text style={styles.buttonText}>Show and Edit Schedule</Text>
        </TouchableOpacity>

        {/* Bottom Two Buttons with Updated Colors */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00BCD4' }]}
          onPress={() => navigation.navigate('RoomLocation')}
        >
          <Text style={styles.buttonText}>Room Locations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#009688' }]}
          onPress={() => navigation.navigate('TeacherAppointment')}
        >
          <Text style={styles.buttonText}>Appointments</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
