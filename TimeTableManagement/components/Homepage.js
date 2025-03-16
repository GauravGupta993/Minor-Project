import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import "../global.css";

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView className="container px-7 bg-white h-full">
      <View className="flex justify-center items-center mt-24">
      </View>
      <Heading content="Project" />
      <Text className="text-sm opacity-60 text-textDark tracking-tight">
        Time Table Management System
      </Text>
      <View className="mt-6">
        {/* Correcting CustomButton to ensure navigation works */}
        <CustomButton
          bgColor={colors.primary}
          textColor={colors.textWhite}
          content={'Login'}
          onPress={() => navigation.navigate('Login')} // ✅ Fixing navigation
        />
        <CustomButton
          bgColor={colors.bgGray}
          textColor={colors.textDark}
          content={'Signup'}
          onPress={() => navigation.navigate('Signup')} // ✅ Fixing navigation
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
