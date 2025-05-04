import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImportTimetablePage = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  const handleExcelImport = async () => {
    if (!email) {
      Alert.alert("Error", "User email not found.");
      return;
    }

    try {
      setLoading(true);
      console.log("WORKING");

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ],
      });
      
      console.log(result);
      
      // Fix for new format
      if (result.canceled || !result.assets || result.assets.length === 0) return;
      
      console.log("WORKING2");
      
      const fileUri = result.assets[0].uri;
      // Continue reading the file and processing...
      
      const fileContents = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const workbook = XLSX.read(fileContents, { type: "base64" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      console.log(json);
      for (const row of json) {
        const day = row.Day;
        const formattedSlots = [];

        for (let i = 1; i <= 8; i++) {
          const cell = row[`Slot ${i}`];
          formattedSlots.push({
            slot: i,
            hasClass: !!cell,
            room: cell || null,
          });
        }

        const body = {
          day,
          email,
          slots: formattedSlots,
        };

        await fetch("http://10.0.2.2:8080/api/timetable/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      // console.log(body);
      Alert.alert("Success", "Excel timetable imported and uploaded.");
    } catch (error) {
      console.error("Error importing Excel:", error);
      Alert.alert("Error", "Failed to import timetable from Excel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Import Timetable</Text>
      <Text className="text-base mb-6">
        Upload an Excel file .
      </Text>

      <TouchableOpacity
        onPress={handleExcelImport}
        className="bg-blue-500 p-4 rounded items-center"
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? "Importing..." : "Pick Excel File"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="mt-6" />
      )}
    </ScrollView>
  );
};

export default ImportTimetablePage;
