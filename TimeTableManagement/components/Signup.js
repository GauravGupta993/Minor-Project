import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';

const Signup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const role = route.params?.role || 'student';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const payload = { name: name.trim(), email: email.trim(), password, role };
      const response = await fetch('http://10.0.2.2:8080/api/auth/signup/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      if (responseText === 'Email already registered') {
        Alert.alert('Error', 'Email Already Registered.');
      } else {
        Alert.alert('Success', 'OTP Sent!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTPVerification', { email, role }),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="items-center mt-16">
          <Image source={require('../assets/register.png')} className="w-24 h-24 mb-4" />
          <Heading content="Create Account" size="lg" />
          <Text className="text-gray-500 mt-1">Sign up as a {role}</Text>
        </View>
        <View className="mt-10 space-y-4">
          <View>
            <Text className="text-gray-700 mb-1">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="John Doe"
              placeholderTextColor={colors.textDark}
              className="bg-white border border-gray-300 focus:border-primary rounded-xl px-4 py-3 shadow-sm"
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@mail.com"
              placeholderTextColor={colors.textDark}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-white border border-gray-300 focus:border-primary rounded-xl px-4 py-3 shadow-sm"
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textDark}
              secureTextEntry
              className="bg-white border border-gray-300 focus:border-primary rounded-xl px-4 py-3 shadow-sm"
            />
          </View>
        </View>
        <View className="mt-8">
          <CustomButton
            content="Signup"
            onPress={handleSignup}
            bgColor={colors.primary}
            textColor={colors.textWhite}
            className="rounded-xl py-3 shadow-lg"
          />
        </View>
        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
            <Text className="underline text-primary">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
