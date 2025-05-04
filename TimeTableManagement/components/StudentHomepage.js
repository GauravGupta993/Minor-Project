import React, { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import "../global.css";

const StudentHomePage = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          console.log(storedEmail);
          if (storedEmail) {
            navigation.navigate('MainScreen');
          }
          // navigation.navigate('MainScreen');
        } catch (error) {
          console.error('Error retrieving email:', error);
        }
      };

      checkToken();
    }, [navigation])
  );
  return (
    <SafeAreaView className="container px-7 bg-white h-full">
      <View className="flex justify-center items-center mt-24" />
      <Heading content="Student Portal" />
      <Text className="text-sm opacity-60 text-textDark tracking-tight">
        Time Table Management System
      </Text>
      <View className="mt-6">
        <CustomButton
          bgColor={colors.primary}
          textColor={colors.textWhite}
          content={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        <CustomButton
          bgColor={colors.bgGray}
          textColor={colors.textDark}
          content={'Signup'}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentHomePage;
