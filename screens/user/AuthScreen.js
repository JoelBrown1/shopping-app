import React from 'react'
import { 
  Button,
  KeyboardAvoidingView, 
  ScrollView, 
  View, 
  StyleSheet, 
} from 'react-native';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView 
      behaviour="padding" 
      keyboardVerticalOffset={50} 
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
        <Input 
            id='email' 
            label="email" 
            keyboardType="email-address" 
            required 
            email 
            autoCapitalize="none" 
            errorMessage="Please enter a valid email address" 
            onInputChange={() => {
              console.log('value has changed');
            }}
            initialValue=""
          />
          <Input 
            id='password' 
            label="password" 
            keyboardType="default" 
            required 
            secureTextEntry
            minLength={5}
            autoCapitalize="none" 
            errorMessage="Please enter a valid password" 
            onInputChange={() => {
              console.log('value has changed');
            }}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button 
              title="login" 
              color={Colors.primary} 
              onPress={() => {
                console.log('clicked login button')
              }} />
            <Button 
              title="Sign up" 
              color={Colors.accent} 
              onPress={() => {
                console.log('clicked sign up button')
              }} 
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 10
  }, 
  buttonContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: "space-around",
  }
})

export default AuthScreen;

