import React, { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react'
import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors'

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

const EditProducts = (props) => {
  const {navigation, route} = props;
  
  const prodId = route.params.productId;
  const modifiedProd = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId))

  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: modifiedProd ? modifiedProd.title : "",
      imageUrl: modifiedProd ? modifiedProd.imageUrl : "",
      price: "",
      description: modifiedProd ? modifiedProd.description : ""
    },
    inputValidities: {
      title: modifiedProd ? true: false,
      imageUrl: modifiedProd ? true: false,
      price: modifiedProd ? true: false,
      description: modifiedProd ? true: false
    },
    formIsValid: modifiedProd ? true: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const submitHandler = useCallback( async () => {
    if( !formState.formIsValid ) {
      Alert.alert("Warning", "there is an error", [{text: 'ok'}])
      return;
    }

    setHasError(false);
    setIsLoading(true);

    try {
      if( modifiedProd ) {
      await dispatch(productActions.updateProduct(
        prodId, 
        formState.inputValues.title, 
        formState.inputValues.description, 
        formState.inputValues.imageUrl))
      } else {
        await dispatch(productActions.createProduct(
          formState.inputValues.title, 
          formState.inputValues.description, 
          formState.inputValues.imageUrl, 
          +formState.inputValues.price))
      }

      navigation.goBack();
    } catch(err) {
      setHasError(true);
    }

    setIsLoading(false);
    
  }, [dispatch, formState, prodId])

  useEffect(() => {
    if(hasError){
      Alert.alert("Warning", "there is an error in submitting the data", [{text: 'ok'}]);
    }
    return () => {
      // cleanup
    }
  }, [hasError])


  useEffect(() => {
    navigation.setOptions(
      {
        headerRight: () => {
          return (
            <HeaderButtons 
              HeaderButtonComponent={CustomHeaderButton}
            >
              <Item 
                title='Add Products' 
                iconName={Platform.OS === 'android' ? 'md-checkmark': 'ios-checkmark'}
                onPress={submitHandler}
              />
            </HeaderButtons>
          )
        }
      }
    )

  }, [submitHandler, dispatchFormState, formState]);

  const inputChangeHandler = useCallback(
    ( id, inputValue, inputValid ) => {

      dispatchFormState({
        type: UPDATE_FORM,
        value: inputValue,
        isValid: inputValid,
        inputId: id
      });
    },
    [dispatchFormState],
  )

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoid}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input 
            id="title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            label="Title *"
            errorText="Please enter a valid title"
            initialValue={modifiedProd ? modifiedProd.title : ""}
            initiallyValid={modifiedProd ? true : false}
            required
            onInputChange={inputChangeHandler}
          />
          
          <Input 
            id="imageUrl"
            keyboardType="default"
            label="Image Url *"
            errorText="Please enter a valid Image URL"
            initialValue={modifiedProd ? modifiedProd.imageUrl : ""}
            initiallyValid={modifiedProd ? true : false}
            required
            onInputChange={inputChangeHandler}
          />
          { modifiedProd ? null : (
            <Input 
              id="price"
              keyboardType="decimal-pad"
              label="Price *"
              errorText="Please enter a valid price"
              required
              min={0.1}
              onInputChange={inputChangeHandler}
              />
          )}
          <Input 
            id="description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multilie
            numberOfLines={3}
            label="Description *"
            errorText="Please enter a valid description"
            initialValue={modifiedProd ? modifiedProd.description : ""}
            initiallyValid={modifiedProd ? true : false}
            required
            minLength={5}
            onInputChange={inputChangeHandler}
            blurOnSubmit={true}
          />
        </View> 
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  keyboardAvoid: {
    flex: 1
  },
  form: {
    margin: 20
  },
})

export default EditProducts
