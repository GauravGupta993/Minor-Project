import React, { useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const role = route.params?.role ; // default to student if not provided

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          const storedName = await AsyncStorage.getItem('name');
          const storedRole = await AsyncStorage.getItem('role');
          const storedsid = await AsyncStorage.getItem('sid');
          console.log(storedEmail);
          console.log(storedName);
          console.log(storedRole);
          console.log(storedsid);
          if (storedEmail) {
            if(storedRole==="student"){
              navigation.navigate("StudentMainScreen");
            }
            else{
              navigation.navigate('MainScreen');
            }
          }
        } catch (error) {
          console.error('Error retrieving email:', error);
        }
      };

      checkToken();
    }, [navigation])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);

    try {
      console.log({ email, password, role });
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      const responseText = await response.text(); // Get raw response text
      console.log('Raw Response:', responseText);
      let responseData = JSON.parse(responseText);
      console.log(responseData.role);
      console.log(role);

      if (responseData.role === role) {
        // Store email as the token in AsyncStorage
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('role', role);
        await AsyncStorage.setItem('name', responseData.name);
        await AsyncStorage.setItem('sid', responseData.sid.toString());
        Alert.alert('Success', 'Login successful!');
        // Redirect back to Homepage. Since email is now not empty,
        // Homepage's useEffect can navigate to Dashboard.
        if(role==="student"){
          navigation.navigate("StudentMainScreen");
        }
        else{
          navigation.navigate('MainScreen');
        }
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="container px-7 bg-white h-full">
      <View className="mt-36">
        <Heading content="Welcome Back" />
      </View>
      <View className="mt-4">
        <TextInput
          onChangeText={setEmail}
          placeholder={'Email'}
          placeholderTextColor={colors.textDark}
          value={email}
          className="bg-zinc-200 py-3 rounded-xl pl-5"
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder={'Password'}
          placeholderTextColor={colors.textDark}
          value={password}
          className="bg-zinc-200 py-3 rounded-xl pl-5 mt-3"
        />
      </View>

      <CustomButton
        bgColor={colors.primary}
        textColor={colors.textWhite}
        content={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
      />

      <View className="mt-10">
        <View className="flex flex-row items-center justify-center mt-44">
          <Text className="text-textDark">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup', { role: role })}>
            <Text className="underline text-textDark">Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
