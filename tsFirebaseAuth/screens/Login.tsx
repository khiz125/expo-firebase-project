import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'

const Login = (): JSX.Element => {

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      };
    });
    return unsubscribe;
  }, []);


  const handleSignUp = async () => {
    if (email === "" || password === "") {
      setValidationMessage('Please fill in the blank')
      return;
    };
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log(userCredential.user.email);
          navigation.navigate('Home');
        })
    } catch (error) {
      if (error instanceof Error) {
        setValidationMessage(error.message);
      }
    };
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log("Login with: ", userCredential.user.email);
          navigation.navigate('Home');
        })
    } catch (error) {
      if (error instanceof Error) {
        setValidationMessage(error.message);
      }
    };
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        {<Text style={styles.error}>{validationMessage}</Text>}
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#32CD32',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: '#32CD32',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#006400',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  }
})