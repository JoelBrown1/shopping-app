import React, { useReducer, useEffect } from 'react'
import {  Text, TextInput, View, StyleSheet } from 'react-native'

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR"
const inputReducer = (state, action) => {
  switch(action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      }
    case INPUT_BLUR:
      return {
        ...state,
        modified: true
      }
    default:
      return state;
  }
}

const Input = (props) => {
  const { initialValue, initiallyValid, label, errorText } = props;
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    modified: false
  })
  console.log("this is the state: ", inputState);
  
  const{ id, onInputChanged } = props;
  useEffect(() => {
    console.log('is useEffect causing the infinite loop')
    if(inputState.modified) {
      onInputChanged(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChanged, id])

  const textChaneHandler = text => {
    console.log('do we get the text value: ', text);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    
    if (props.required && text.trim().length === 0) {
      console.log('is there a value length: ', text.trim().length)
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid
    })
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View style={styles.formControls}>
      <Text style={styles.title}>{label}</Text>
      <TextInput 
        {...props}
        style={styles.input} 
        value={inputState.value} 
        onChangeText={textChaneHandler}
        onBlur={lostFocusHandler}
      />
      {inputState.modified && !inputState.isValid && <View style={styles.errorContainer}><Text style={styles.error}>{errorText}</Text></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  formControls: {
    width: '100%'
  },
  title: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  error: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: 'red',
  }
})

export default Input
