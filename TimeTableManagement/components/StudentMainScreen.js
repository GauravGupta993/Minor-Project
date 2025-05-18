import React, { useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentMainScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('role');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

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
          onPress={() => navigation.navigate('EmptyRoom')}
        >
          <Text style={styles.buttonText}>Show Empty Rooms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF9800' }]}
          onPress={() => navigation.navigate('RoomLocation')}
        >
          <Text style={styles.buttonText}>Room Locations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#009688' }]}
          onPress={() => navigation.navigate('BookAppointment')}
        >
          <Text style={styles.buttonText}>Book Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#9C27B0' }]}
          onPress={() => navigation.navigate('StudentAppointment')}
        >
          <Text style={styles.buttonText}>Student Appointments</Text>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentMainScreen;
