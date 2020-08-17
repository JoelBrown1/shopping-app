import React, { useReducer, useCallback } from 'react'
import { 
  Button,
  KeyboardAvoidingView, 
  ScrollView, 
  View, 
  StyleSheet, 
} from 'react-native';
import {useDisptach, useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth'

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors';

const UPDATE_FORM = "UPDATE_FORM"
const formReducer = (state, action) => {
  if( action.type === UPDATE_FORM) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid
    }

    let updatedFormIsValid = true;
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }

  return state;
}

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const signupHandler = () => {
    dispatch(authActions.signup( formState.inputValues.email, formState.inputValues.password ))
  }

  const inputChangeHandler = useCallback(( id, inputValue, inputValid ) => {
    dispatchFormState({
      type: UPDATE_FORM,
      value: inputValue,
      isValid: inputValid,
      inputId: id
    });
  }, [dispatchFormState])

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
            errorText="Please enter a valid email address" 
            onInputChange={inputChangeHandler}
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
            errorText="Please enter a valid password" 
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button 
              title="login" 
              color={Colors.primary} 
              onPress={ signupHandler } />
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

