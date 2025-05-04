import React, { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import "../global.css";

const MainHomePage = ({ navigation }) => {
  return (
    <SafeAreaView className="container px-7 bg-white h-full">
      <View className="flex justify-center items-center mt-24">
        <Heading content="Campus Slots" />
        <Text className="text-sm opacity-60 text-textDark tracking-tight">
          Time Table Management System
        </Text>
        {/* Add Image Here */}
        <Image
          source={require('../assets/CMS.jpg')}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      </View>
      <View className="mt-6">
        <CustomButton
          bgColor={colors.primary}
          textColor={colors.textWhite}
          content={'Student'}
          onPress={() => navigation.navigate('StudentHomepage')}
        />
        <CustomButton
          bgColor={colors.primary}
          textColor={colors.textWhite}
          content={'Teacher'}
          onPress={() => navigation.navigate('Homepage')}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainHomePage;

