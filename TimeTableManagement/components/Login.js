import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseText = await response.text(); // Get raw response text
      console.log('Raw Response:', responseText);

      if (responseText==='Login successful') {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('MainScreen'); // ✅ Correct navigation
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

      {/* ✅ Fix: Pass onPress directly */}
      <CustomButton
        bgColor={colors.primary}
        textColor={colors.textWhite}
        content={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin} // ✅ Pass function instead of navigation
      />

      <View className="mt-10">
        <View className="flex flex-row items-center justify-center mt-44">
          <Text className="text-textDark">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="underline text-textDark">Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
