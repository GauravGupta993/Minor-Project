import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookAppointmentScreen() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [date, setDate] = useState('');
  const [freeSlots, setFreeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState('');
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/api/appointments/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => {
        console.error('Error fetching teachers:', err);
        Alert.alert('Error', 'Failed to load teachers');
      });

    AsyncStorage.getItem('sid')
      .then(id => {
        if (id) setStudentId(parseInt(id));
        else Alert.alert('Error', 'Student ID not found in storage');
      });
  }, []);

  useEffect(() => {
    if (selectedTeacherId && date.length === 10) {
      const url = `http://10.0.2.2:8080/api/appointments/teachers/${selectedTeacherId}/free-slots?date=${date}`;
      fetch(url)
        .then(res => res.json())
        .then(data => setFreeSlots(data))
        .catch(err => {
          console.error('Error fetching slots:', err);
          Alert.alert('Error', 'Failed to load free slots');
        });
    } else {
      setFreeSlots([]);
    }
  }, [date, selectedTeacherId]);

  const handleSubmit = () => {
    if (!selectedTeacherId || !date || !selectedSlot || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const payload = {
      studentId,
      teacherId: selectedTeacherId,
      date,
      slotNumber: selectedSlot,
      description,
    };

    fetch('http://10.0.2.2:8080/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to book');
        return res.json();
      })
      .then(() => {
        Alert.alert('Success', 'Appointment booked!');
        // reset fields
        setSelectedTeacherId(null);
        setDate('');
        setSelectedSlot(null);
        setDescription('');
        setFreeSlots([]);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Booking failed');
      });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-4">Book Appointment</Text>

      {/* 1. Select Teacher */}
      <Text className="mb-1 font-medium">Select Teacher</Text>
      <View className="bg-gray-100 rounded mb-4">
        <Picker
          selectedValue={selectedTeacherId}
          onValueChange={(value) => {
            setSelectedTeacherId(value);
            setDate('');
            setFreeSlots([]);
            setSelectedSlot(null);
          }}
        >
          <Picker.Item label="-- Choose Teacher --" value={null} />
          {teachers.map((teacher) => (
            <Picker.Item key={teacher.sid} label={teacher.name} value={teacher.sid} />
          ))}
        </Picker>
      </View>

      {/* 2. Enter Date (enabled only if teacher is selected) */}
      {selectedTeacherId && (
        <>
          <Text className="mb-1 font-medium">Enter Date (YYYY-MM-DD)</Text>
          <TextInput
            placeholder="e.g., 2024-06-10"
            className="border border-gray-300 p-3 rounded mb-4"
            value={date}
            onChangeText={(val) => {
              setDate(val);
              setSelectedSlot(null);
              setFreeSlots([]);
            }}
          />
        </>
      )}

      {/* 3. Select Slot (enabled if date & teacher are set and slots fetched) */}
      {date.length === 10 && freeSlots.length > 0 && (
        <>
          <Text className="mb-1 font-medium">Select Free Slot</Text>
          <View className="border border-gray-300 rounded mb-4">
            <Picker
              selectedValue={selectedSlot}
              onValueChange={(value) => setSelectedSlot(value)}
            >
              <Picker.Item label="-- Select Slot --" value={null} />
              {freeSlots.map((slot) => (
                <Picker.Item key={slot} label={`Slot ${slot}`} value={slot} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* 4. Description & Submit */}
      {selectedSlot && (
        <>
          <Text className="mb-1 font-medium">Description</Text>
          <TextInput
            placeholder="Write reason..."
            multiline
            className="border border-gray-300 p-3 rounded mb-4 h-20"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            className="bg-blue-600 px-4 py-3 rounded items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-semibold text-base">Submit Appointment</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
