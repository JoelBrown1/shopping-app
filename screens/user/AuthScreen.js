import React, { useReducer, useCallback, useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView, 
  ScrollView, 
  View, 
  StyleSheet,
  Alert, 
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
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState()

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

  useEffect(() => {
    if(hasError) {
      Alert.alert('An error happened', hasError, [{text: 'ok'}]);
    }
  }, [hasError])

  const authHandler = async () => {
    let action;
    if(isSignup) {
      action = authActions.signup( formState.inputValues.email, formState.inputValues.password )
    } else {
      action = authActions.login( formState.inputValues.email, formState.inputValues.password )
    }

    setHasError(null);
    setIsLoading(true);
    try{
      await dispatch(action);
      console.log('what is in navigation: ', navigation);
      navigation.navigate('Products')
    } catch(err){
      setHasError(err.message);
      setIsLoading(false);
    }
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
            {isLoading ? (<ActivityIndicator size='large' color={Colors.primary}/>) : (<Button 
              title={isSignup ? "Sign up" : "login" }
              color={Colors.primary} 
              onPress={ authHandler } />)}
            <Button 
              title={`Switch to  ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.accent} 
              onPress={() => {
                setIsSignup(prevState => !prevState);
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

