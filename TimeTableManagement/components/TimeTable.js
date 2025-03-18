import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Switch,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  { id: 1, time: "8AM - 9AM" },
  { id: 2, time: "9AM - 10AM" },
  { id: 3, time: "10AM - 11AM" },
  { id: 4, time: "11AM - 12PM" },
  { id: 5, time: "12PM - 1PM" },
  { id: 6, time: "2PM - 3PM" },
  { id: 7, time: "3PM - 4PM" },
  { id: 8, time: "4PM - 5PM" },
];

const roomLetters = ["L", "T"];

const TimeTablePage = () => {
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [slots, setSlots] = useState(
    timeSlots.reduce((acc, slot) => {
      acc[slot.id] = {
        hasClass: false,
        roomLetter: "L",
        roomNumber: "",
        time: slot.time,
      };
      return acc;
    }, {})
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const handleSlotPress = (slotId) => {
    setActiveSlot(slotId);
    setModalVisible(true);
  };

  const updateActiveSlot = (data) => {
    if (!activeSlot) return;
    setSlots((prev) => ({
      ...prev,
      [activeSlot]: { ...prev[activeSlot], ...data },
    }));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setActiveSlot(null);
  };

  const handleSubmit = async () => {
    const timetable = {
      day: selectedDay,
      slots: timeSlots.map((slot) => ({
        slot: slot.id, // saving slot number instead of time
        hasClass: slots[slot.id].hasClass,
        room: slots[slot.id].hasClass
          ? `${slots[slot.id].roomLetter}${slots[slot.id].roomNumber || ""}`
          : null,
      })),
    };

    console.log("Timetable to submit:", timetable);

    try {
      const response = await fetch(
        "http://your-backend-url.com/api/timetable",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(timetable),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      Alert.alert("Success", "Timetable saved successfully");
    } catch (error) {
      console.error("Error saving timetable:", error);
      Alert.alert("Error", "Failed to save timetable. Please try again.");
    }
  };

  const currentSlotData = activeSlot ? slots[activeSlot] : null;

  return (
    <ScrollView className="bg-white p-4" nestedScrollEnabled={true}>
      <Text className="text-2xl font-bold mb-4">Select Day</Text>
      <View className="border border-gray-300 rounded mb-4">
        <Picker
          selectedValue={selectedDay}
          onValueChange={setSelectedDay}
          style={{ height: 55 }}
          className="w-full"
        >
          {days.map((day, index) => (
            <Picker.Item label={day} value={day} key={index} />
          ))}
        </Picker>
      </View>

      <Text className="text-2xl font-bold mb-4">Time Slots</Text>
      {timeSlots.map((slot) => (
        <TouchableOpacity
          key={slot.id}
          onPress={() => handleSlotPress(slot.id)}
          className="mb-4 p-4 border border-gray-300 rounded"
        >
          <Text className="text-lg font-semibold mb-2">{slot.time}</Text>
          <Text className="text-base">
            {slots[slot.id].hasClass
              ? `Scheduled: ${slots[slot.id].roomLetter}${
                  slots[slot.id].roomNumber
                }`
              : "Not Scheduled"}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded items-center my-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-xl font-bold">Save Timetable</Text>
      </TouchableOpacity>

      {/* Modal for slot data entry */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        {/* Using BlurView for a blurred background */}
        <BlurView intensity={95} tint="light" style={{ flex: 1 }}>
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-4 rounded w-80 shadow-xl">
              {currentSlotData && (
                <>
                  <Text className="text-xl font-bold mb-4">
                    Slot {activeSlot} - {currentSlotData.time}
                  </Text>
                  <View className="flex-row items-center mb-4">
                    <Text className="text-base mr-2">Class Scheduled:</Text>
                    <Switch
                      value={currentSlotData.hasClass}
                      onValueChange={(value) =>
                        updateActiveSlot({ hasClass: value })
                      }
                    />
                  </View>
                  {currentSlotData.hasClass && (
                    <>
                      <Text className="text-base mb-1">
                        Select Room Letter:
                      </Text>
                      <View className="border border-gray-300 rounded mb-4">
                        <Picker
                          selectedValue={currentSlotData.roomLetter}
                          onValueChange={(itemValue) =>
                            updateActiveSlot({ roomLetter: itemValue })
                          }
                          style={{ height: 50 }}
                          className="w-full"
                        >
                          {roomLetters.map((letter, idx) => (
                            <Picker.Item
                              label={letter}
                              value={letter}
                              key={idx}
                            />
                          ))}
                        </Picker>
                      </View>
                      <Text className="text-base mb-1">Enter Room Number:</Text>
                      <View className="border border-gray-300 rounded mb-4">
                        <TextInput
                          value={currentSlotData.roomNumber}
                          onChangeText={(text) =>
                            updateActiveSlot({
                              roomNumber: text.replace(/[^0-9]/g, ""),
                            })
                          }
                          keyboardType="numeric"
                          placeholder="Enter room number"
                          className="h-12 text-lg px-2"
                        />
                      </View>
                    </>
                  )}
                  <View className="flex-row justify-end">
                    <TouchableOpacity
                      onPress={handleModalClose}
                      className="bg-gray-500 p-2 rounded mr-2"
                    >
                      <Text className="text-white">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleModalClose}
                      className="bg-blue-500 p-2 rounded"
                    >
                      <Text className="text-white">Save</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </BlurView>
      </Modal>
    </ScrollView>
  );
};

export default TimeTablePage;
