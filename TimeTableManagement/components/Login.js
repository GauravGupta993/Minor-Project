import React, { useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, TextInput, Alert, Image, ScrollView } from 'react-native';
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
  const role = route.params?.role || 'student';

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          const storedRole = await AsyncStorage.getItem('role');
          if (storedEmail) {
            navigation.replace(storedRole === 'student' ? 'StudentMainScreen' : 'MainScreen');
          }
        } catch (error) {
          console.error('Error retrieving token:', error);
        }
      };
      checkToken();
    }, [navigation])
  );

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, role }),
      });
      const data = await res.json();
      if (data.role === role) {
        await AsyncStorage.multiSet([
          ['email', email.trim()],
          ['role', role],
          ['name', data.name],
          ['sid', data.sid.toString()],
        ]);
        navigation.replace(role === 'student' ? 'StudentMainScreen' : 'MainScreen');
      } else {
        Alert.alert('Error', 'Invalid credentials.');
      }
    } catch (e) {
      console.error('Login error:', e);
      Alert.alert('Error', 'Unable to login.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-white to-gray-100 px-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="items-center mt-16">
          <Image source={require('../assets/log-in.png')} className="w-24 h-24 mb-4" />
          <Heading content="Welcome Back" size="lg" />
          <Text className="text-gray-500 mt-1">Login to your {role} account</Text>
        </View>
        <View className="mt-10 space-y-4">
          <View>
            <Text className="text-gray-700 mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@mail.com"
              placeholderTextColor={colors.textDark}
              className="bg-white border border-gray-300 focus:border-primary rounded-xl px-4 py-3 shadow-sm"
              keyboardType="email-address"
              autoCapitalize="none"
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
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-right text-primary font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-8">
          <CustomButton
            content={loading ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            bgColor={colors.primary}
            textColor={colors.textWhite}
            className="rounded-xl py-3 shadow-lg"
          />
        </View>
        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup', { role })}>
            <Text className="underline text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
