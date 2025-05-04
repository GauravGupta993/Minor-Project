import React, { useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          console.log(storedEmail);
          if (!storedEmail) {
            navigation.navigate('Homepage');
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
      // Alternatively, clear all storage: await AsyncStorage.clear();

      // Navigate to the Homepage or Login screen as per your flow
      navigation.navigate('Homepage');
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
      source={require('../assets/CMS.jpg')} // Replace with your image path
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mb-4 w-64"
          onPress={() => navigation.navigate('TimeTableImport')}
        >
          <Text className="text-white text-center text-lg">Upload Time Table</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg mb-4 w-64"
          onPress={() => navigation.navigate('EmptyRoom')}
        >
          <Text className="text-white text-center text-lg">Show Empty Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purple-500 p-4 rounded-lg mb-4 w-64"
          onPress={() => navigation.navigate('TimeTable')}
        >
          <Text className="text-white text-center text-lg">Show and Edit Schedule</Text>
        </TouchableOpacity>
        
        {/* Bottom Two Buttons with Updated Colors */}
        <TouchableOpacity
          className="bg-orange-500 p-4 rounded-lg mb-4 w-64"
          onPress={() => navigation.navigate('RoomLocation')}
        >
          <Text className="text-white text-center text-lg">Room Locations</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-teal-500 p-4 rounded-lg w-64"
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text className="text-white text-center text-lg">Appointments</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MainScreen;
