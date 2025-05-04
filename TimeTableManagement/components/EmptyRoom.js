import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const days = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
];

const slots = [
  { label: '8AM-9AM', value: '1' },
  { label: '9AM-10AM', value: '2' },
  { label: '10AM-11AM', value: '3' },
  { label: '11AM-12PM', value: '4' },
  { label: '12PM-1PM', value: '5' },
  { label: '2PM-3PM', value: '6' },
  { label: '3PM-4PM', value: '7' },
  { label: '4PM-5PM', value: '8' },
];

const EmptyRoomFinder = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDay && selectedSlot) {
      const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://10.0.2.2:8080/api/rooms/freerooms/${selectedDay}/${selectedSlot}`);
          if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRooms(data);
          console.log(data);
        } catch (err) {
          setError(err.message);
          setRooms([]);
        } finally {
          setLoading(false);
        }
      };
      fetchRooms();
    }
  }, [selectedDay, selectedSlot]);

  const handleDayChange = (item) => {
    setSelectedDay(item.value);
    setSelectedSlot(null);
    setRooms([]);
  };

  const handleSlotChange = (item) => {
    setSelectedSlot(item.value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Empty Rooms</Text>
      <Dropdown
        style={styles.dropdown}
        data={days}
        labelField="label"
        valueField="value"
        placeholder="Select Day"
        value={selectedDay}
        onChange={handleDayChange}
      />
      <Dropdown
        style={styles.dropdown}
        data={slots}
        labelField="label"
        valueField="value"
        placeholder="Select Slot"
        value={selectedSlot}
        onChange={handleSlotChange}
        disabled={!selectedDay}
      />
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.room}>{item}</Text>}
        ListEmptyComponent={!loading && <Text style={styles.noRooms}>No rooms available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdown: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  loading: {
    fontSize: 18,
    padding: 8,
    color: 'blue',
  },
  error: {
    fontSize: 18,
    padding: 8,
    color: 'red',
  },
  room: {
    fontSize: 18,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noRooms: {
    fontSize: 18,
    padding: 8,
    color: 'red',
  },
});

export default EmptyRoomFinder;
