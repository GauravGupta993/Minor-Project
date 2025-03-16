import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4 w-64"
        onPress={() => navigation.navigate('UploadTimeTable')}
      >
        <Text className="text-white text-center text-lg">Upload Time Table</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg mb-4 w-64"
        onPress={() => navigation.navigate('ShowEmptyRooms')}
      >
        <Text className="text-white text-center text-lg">Show Empty Rooms</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-purple-500 p-4 rounded-lg w-64"
        onPress={() => navigation.navigate('ShowSchedule')}
      >
        <Text className="text-white text-center text-lg">Show Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
