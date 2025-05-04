import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('sid').then(id => {
      if (id) {
        const parsedId = parseInt(id);
        setStudentId(parsedId);
        fetchAppointments(parsedId);
      } else {
        Alert.alert('Error', 'Student ID not found in storage');
      }
    });
  }, []);

  const fetchAppointments = (id) => {
    fetch(`http://10.0.2.2:8080/api/appointments/students/${id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => {
        console.error('Fetch error:', err);
        Alert.alert('Error', 'Failed to load appointments');
      });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Your Appointments</Text>

      {appointments.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">No appointments found.</Text>
      ) : (
        appointments.map(appt => (
          <View
            key={appt.id}
            className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-300"
          >
            <Text className="text-lg font-semibold mb-1">
              Teacher: {appt.teacher.name}
            </Text>
            <Text>Email: {appt.teacher.email}</Text>
            <Text>Date: {appt.date}</Text>
            <Text>Slot: {appt.slotNumber}</Text>
            <Text>Description: {appt.description}</Text>
            <Text>Status: <Text className="font-bold">{appt.status}</Text></Text>
            {appt.alternativeSlot && (
              <Text className="text-red-600 mt-1">
                Suggested Slot: {appt.alternativeSlot}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
