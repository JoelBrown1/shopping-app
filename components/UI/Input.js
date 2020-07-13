import React, { useEffect, useReducer } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'

const INPUT_CHANGED = "INPUT_CHANGED"
const LOST_FOCUS = "LOST_FOCUS"
const inputReducer = (state, action) => {
  switch(action.type) {
    case INPUT_CHANGED:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      }
    case LOST_FOCUS:
      return {
        ...state,
        modified: true
      }
    default:
      return state;
  }
}

const Input = (props) => {
  const { initialValue, initiallyValid } = props
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid ? true : false,
    modified: false
  })

  const { id, onInputChanged } = props
  useEffect(() => {
    console.log("inputState details: ", inputState);
    if(inputState.modified) {
      console.log("this should happend if modified is true: ", inputState.modified);
      onInputChanged(id, inputState.value, inputState.isValid)
    }
  }, [onInputChanged, inputState, id])

  const{ required, email, min, max, minLength } = props
  const textChangedHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGED,
      value: text,
      isValid: isValid
    })
  }

  const lostFocusHandler = () => {
    dispatch({
      type: LOST_FOCUS
    })
  }

  const { label, errorText } = props;
  return (
    <View style={styles.formControls}>
      <Text style={styles.title}>{label}</Text>
      <TextInput 
        { ...props }
        style={styles.input} 
        value={inputState.value} 
        onChangeText={textChangedHandler}
        onFocus={lostFocusHandler}
        // onBlur={lostFocusHandler}
        returnKeyType="next"
        />
        { !inputState.isValid && <Text>{errorText}</Text> }
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
  error: {
    color: 'red',
    marginVertical: 5
  }
})

export default Input