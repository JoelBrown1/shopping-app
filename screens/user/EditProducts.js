import React, { useCallback, useLayoutEffect, useReducer } from 'react'
import {Alert, Platform, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const UPDATE_FORM = "UPDATE_FORM"
const formReducer = (state, action) => {
  console.log('what is in the action: ', action);
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


  const submitHandler = useCallback(() => {
    if( !formState.formIsValid ) {
      Alert.alert("Warning", "there is an error", [{text: 'ok'}])
      return;
    }
    if( modifiedProd ) {
      dispatch(productActions.updateProduct(
        prodId, 
        formState.inputValues.title, 
        formState.inputValues.description, 
        formState.inputValues.imageUrl))
    } else {
      dispatch(productActions.createProduct(
        formState.inputValues.title, 
        formState.inputValues.description, 
        formState.inputValues.imageUrl, 
        +formState.inputValues.price))
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
                  onPress={ submitHandler }
              />
            </HeaderButtons>
          )
        }
      }
    )
  }, [navigation, formState]);

  const textChangeHandler = ( id, text ) => {
    let isValid = false
    if(text.trim().length > 0) {
      isValid = true
    }

    dispatchFormState({
      type: UPDATE_FORM,
      value: text,
      isValid: isValid,
      inputId: id
    });
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControls}>
          <Text style={styles.title}>Title</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.title} 
            onChangeText={textChangeHandler.bind(this, 'title')}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log('title has ended editing')}
            onSubmitEditing={() => console.log('submit editing has been done')}
            />
            { !formState.inputValidities.title && <Text>Please enter a valid title</Text>}
        </View>
        <View style={styles.formControls}>
          <Text style={styles.title}>Image URL</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.imageUrl} 
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}
            keyboardType="default"
            />
        </View>
        { modifiedProd ? null : (
          <View style={styles.formControls}>
            <Text style={styles.title}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={formState.inputValues.price} 
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType="decimal-pad"
              />
          </View>
        )}
        <View style={styles.formControls}>
          <Text style={styles.title}>Description</Text>
          <TextInput 
            style={styles.input} 
            value={formState.inputValues.description} 
            onChangeText={textChangeHandler.bind(this, 'description')}
            keyboardType="default"
            />
        </View>
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
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
  }
})

export default EditProducts
