import React, { useCallback, useLayoutEffect, useReducer } from 'react'
import {Alert, Platform, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Input from '../../components/UI/Input'

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
  })


  const submitHandler = useCallback((data) => {
    console.log("formState value: ", formState);
    if( !formState.formIsValid ) {
      Alert.alert("Warning", "there is an error", [{text: 'ok'}])
      return;
    }
    if( modifiedProd ) {
      dispatch(productActions.updateProduct(
        prodId, 
        data.inputValues.title, 
        data.inputValues.description, 
        data.inputValues.imageUrl))
    } else {
      dispatch(productActions.createProduct(
        data.inputValues.title, 
        data.inputValues.description, 
        data.inputValues.imageUrl, 
        +data.inputValues.price))
    }
    navigation.goBack();
  }, [dispatch, formState, prodId])


  useLayoutEffect(() => {
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
                  onPress={() => submitHandler(formState) }
              />
            </HeaderButtons>
          )
        }
      }
    )

  }, [navigation, formState]);

  const textChangeHandler = useCallback(
    ( id, inputValue, inputValid ) => {
      console.log("inside the textChangedHandler")
      console.log("id: ", id)
      console.log("inputvalue: ", inputValue)
      console.log("inputValid: ", inputValid)

      dispatchFormState({
        type: UPDATE_FORM,
        value: inputValue,
        isValid: inputValid,
        inputId: id
      });
    },
    [dispatchFormState],
  )

  return (
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
          onInputChanged={textChangeHandler}
        />
        
        <Input 
          id="imageUrl"
          keyboardType="default"
          label="Image Url *"
          errorText="Please enter a valid Image URL"
          initialValue={modifiedProd ? modifiedProd.imageUrl : ""}
          initiallyValid={modifiedProd ? true : false}
          required
          onInputChanged={textChangeHandler}
        />
        { modifiedProd ? null : (
          <Input 
            id="price"
            keyboardType="decimal-pad"
            label="Price *"
            errorText="Please enter a valid price"
            required
            min={0.1}
            onInputChanged={textChangeHandler}
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
          onInputChanged={textChangeHandler}
        />
      </View> 
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1
  },
  form: {
    margin: 20
  },
})

export default EditProducts
