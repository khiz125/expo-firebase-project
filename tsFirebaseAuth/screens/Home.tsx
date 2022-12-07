import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationHelpersContext, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Home = (): JSX.Element => {

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleSignOut = async () => {
    try {
      signOut(auth)
        .then(() => {
          navigation.replace('Login')
        })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    };
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#32CD32',
    width: '40%',
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: '#32CD32',
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: '#006400',
    fontWeight: '700',
    fontSize: 16,
  },
})