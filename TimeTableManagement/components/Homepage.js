import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import Heading from '../components/Heading';

const HomePage = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail) {
            navigation.navigate('MainScreen');
          }
        } catch (error) {
          console.error('Error retrieving email:', error);
        }
      };

      checkToken();
    }, [navigation])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/teacher.png')}
          style={styles.logo}
        />
        <Heading content="Teacher Portal" size="lg" />
        <Text style={styles.subtitle}>Time Table Management System</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            bgColor={colors.primary}
            textColor={colors.textWhite}
            content={'Login'}
            onPress={() => navigation.navigate('Login', { role: 'teacher' })}
            style={styles.button}
          />
          <CustomButton
            bgColor={colors.bgGray}
            textColor={colors.textDark}
            content={'Signup'}
            onPress={() => navigation.navigate('Signup', { role: 'teacher' })}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center',
    marginTop: 40, // Adjust this value to move content upwards or downwards
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textDark,
    opacity: 0.6,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 32,
    width: '100%',
  },
  button: {
    marginVertical: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
});

export default HomePage;
