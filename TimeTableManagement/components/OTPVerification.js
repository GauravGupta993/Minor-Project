import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import axios from "axios";

const OTPVerification = ({ route, navigation }) => {
  const { email, role } = route.params; // Get email from signup page
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:8080/api/auth/signup/verify", {
        email,
        otp,
      });
      console.log(response.data);
      console.log(response);
      if (response.data==='Signup successful') {
        Alert.alert("Success", "OTP Verified Successfully!");
        if(role=="student"){
          navigation.navigate("StudentHomepage");
        }
        else{
          navigation.navigate("Homepage"); 
        }
      }else if(response.data==='No pending signup found for this email'){
        Alert.alert(response.data);
      }
       else {
        Alert.alert("Error",  "Invalid OTP.");
        // console.log(email);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      // console.log(email);
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 justify-center items-center p-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Verify OTP</Text>
      <Text style={tw`text-gray-600 mb-6`}>Enter the 6-digit code sent to {email}</Text>

      <TextInput
        style={tw`w-full bg-white text-center text-lg p-4 rounded-xl mb-4 border border-gray-300`}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity
        style={tw`w-full bg-blue-500 p-4 rounded-xl items-center`}
        onPress={handleVerifyOTP}
      >
        <Text style={tw`text-white font-semibold text-lg`}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mt-4`} onPress={() => Alert.alert("Resend OTP", "OTP has been resent.")}>
        <Text style={tw`text-blue-500 text-base`}>Didn't receive the OTP? Resend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerification;
