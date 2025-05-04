import React, { useState } from 'react';
import { View, Text, Button, Platform, Linking, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RoomLocationsPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Room data: L1 to L10 with description and coordinates
  const rooms = [
    { name: 'Select Room', latitude: null, longitude: null, description: 'Please select a room' }, // Default value
    { name: 'Room L1', latitude: 12.9716, longitude: 77.5946, description: 'Lecture Hall 1' },
    { name: 'Room L2', latitude: 12.9721, longitude: 77.5952, description: 'Lecture Hall 2' },
    { name: 'Room L3', latitude: 12.9730, longitude: 77.5960, description: 'Lecture Hall 3' },
    { name: 'Room L4', latitude: 12.9740, longitude: 77.5970, description: 'Lecture Hall 4' },
    { name: 'Room L5', latitude: 12.9750, longitude: 77.5980, description: 'Lecture Hall 5' },
    { name: 'Room L6', latitude: 12.9760, longitude: 77.5990, description: 'Lecture Hall 6' },
    { name: 'Room L7', latitude: 12.9770, longitude: 77.6000, description: 'Lecture Hall 7' },
    { name: 'Room L8', latitude: 12.9780, longitude: 77.6010, description: 'Lecture Hall 8' },
    { name: 'Room L9', latitude: 12.9790, longitude: 77.6020, description: 'Lecture Hall 9' },
    { name: 'Room L10', latitude: 12.9800, longitude: 77.6030, description: 'Lecture Hall 10' },
  ];

  const handleNavigation = () => {
    if (!selectedRoom || selectedRoom.name === 'Select Room') {
      Alert.alert("Error", "Please select a room.");
      return;
    }

    const { latitude, longitude } = selectedRoom;

    // Open the selected location in Google Maps
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`
    });

    Linking.openURL(url).catch((err) => {
      console.error('Failed to open map:', err);
      Alert.alert("Error", "Could not open map.");
    });
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Room Locations</Text>
      <Text className="text-base mb-6">
        Select a room to view its location on the map.
      </Text>

      {/* Picker for selecting the room */}
      <View className="mb-6">
        <Picker
          selectedValue={selectedRoom}
          onValueChange={(itemValue) => setSelectedRoom(itemValue)}
        >
          {rooms.map((room, index) => (
            <Picker.Item
              key={index}
              label={room.name}
              value={room}
            />
          ))}
        </Picker>
      </View>

      {/* Display the selected room description */}
      {selectedRoom && selectedRoom.name !== 'Select Room' && (
        <View className="mb-6">
          <Text className="text-lg font-semibold">{selectedRoom.name}</Text>
          <Text className="text-base">{selectedRoom.description}</Text>
        </View>
      )}

      {/* Button to open the room location on Google Maps */}
      <Button
        title="View Location on Map"
        onPress={handleNavigation}
      />
    </ScrollView>
  );
};

export default RoomLocationsPage;
