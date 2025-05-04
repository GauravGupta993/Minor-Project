import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TeacherAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [alternativeSlot, setAlternativeSlot] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('sid').then(id => {
      if (id) {
        const parsedId = parseInt(id);
        setTeacherId(parsedId);
        fetchAppointments(parsedId);
      } else {
        Alert.alert('Error', 'Teacher ID not found in storage');
      }
    });
  }, []);

  const fetchAppointments = (id) => {
    fetch(`http://10.0.2.2:8080/api/appointments/teachers/${id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => {
        console.error('Fetch error:', err);
        Alert.alert('Error', 'Failed to load appointments');
      });
  };

  const handleAccept = (appointmentId) => {
    fetch(`http://10.0.2.2:8080/api/appointments/${appointmentId}/accept`, {
      method: 'PUT',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to accept');
        return res.json();
      })
      .then(() => {
        Alert.alert('Accepted', 'Appointment accepted');
        fetchAppointments(teacherId);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not accept appointment');
      });
  };

  const handleReject = () => {
    if (!alternativeSlot) {
      Alert.alert('Error', 'Please provide an alternative slot');
      return;
    }

    fetch(`http://10.0.2.2:8080/api/appointments/${selectedAppointmentId}/reject`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alternativeSlot }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to reject');
        return res.json();
      })
      .then(() => {
        Alert.alert('Rejected', 'Appointment rejected with suggestion');
        setRejectModalVisible(false);
        setAlternativeSlot('');
        fetchAppointments(teacherId);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not reject appointment');
      });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Your Appointments</Text>

      {appointments.map(appt => (
        <View
          key={appt.id}
          className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-300"
        >
          <Text className="text-lg font-semibold mb-1">
            Student: {appt.student.name}
          </Text>
          <Text>Email: {appt.student.email}</Text>
          <Text>Date: {appt.date}</Text>
          <Text>Slot: {appt.slotNumber}</Text>
          <Text>Description: {appt.description}</Text>
          <Text>Status: {appt.status}</Text>
          {appt.alternativeSlot && (
            <Text className="text-red-500">Alt Slot: {appt.alternativeSlot}</Text>
          )}

          {appt.status === 'UNSEEN' && (
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-green-600 px-4 py-2 rounded"
                onPress={() => handleAccept(appt.id)}
              >
                <Text className="text-white font-bold">Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded"
                onPress={() => {
                  setSelectedAppointmentId(appt.id);
                  setRejectModalVisible(true);
                }}
              >
                <Text className="text-white font-bold">Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {/* Reject Modal */}
      <Modal
        visible={rejectModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRejectModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-[90%] p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Suggest Alternative Slot</Text>

            <TextInput
              placeholder="Enter alternative slot suggestion"
              className="border border-gray-300 p-3 rounded mb-4"
              value={alternativeSlot}
              onChangeText={setAlternativeSlot}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded"
                onPress={() => {
                  setAlternativeSlot('');
                  setRejectModalVisible(false);
                }}
              >
                <Text className="text-black">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded"
                onPress={handleReject}
              >
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
