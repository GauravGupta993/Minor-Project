import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      const payload = { name, email, password };
      const response = await fetch('http://10.0.2.2:8080/api/auth/signup/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      if (responseText === 'Email already registered') {
        Alert.alert('Error', 'Email Already Registered.');
      } else {
        Alert.alert('Success', 'OTP Sent!', [
          { text: 'OK', onPress: () => navigation.navigate('OTPVerification', {email:email}) },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Heading content="Create Account" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={colors.textDark}
          value={name}
          style={styles.input}
        />
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.textDark}
          value={email}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.textDark}
          value={password}
          style={styles.input}
        />
      </View>
      <CustomButton
        bgColor={colors.primary}
        textColor={colors.textWhite}
        onPress={handleSignup}
        content="Signup"
      />
      <View style={styles.footer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: '#fff',
  },
  headingContainer: {
    marginTop: 100,
  },
  inputContainer: {
    marginTop: 16,
  },
  input: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    color: '#333',
  },
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#666',
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Signup;
