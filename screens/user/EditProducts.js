import React, { useLayoutEffect, useReducer, useCallback } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'

const UPDATE_FORM = "UPDATE_FORM";
const formReducer = (state, action) => {
  switch(action.type) {
    case UPDATE_FORM:
      console.log("formReducer was called");
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      }
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      }
      const updatedInputMods = {
        ...state.inputMods,
        [action.input]: true
      }
      let formIsValid = true;
      for (const key in updatedValidities ) {
        formIsValid = formIsValid && updatedValidities[key];
      }

      const updatedState = {
        ...state,
        inputMods: updatedInputMods,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid
      }

      return updatedState;
  }
}

const EditProducts = (props) => {
  const {navigation, route} = props;
  
  const prodId = route.params.productId;
  const modifiedProd = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId))

  /**
   * these state assignments are handled by the useReducer below to 
   * validate the validity of the form
   */
  // const [title, setTitle] = useState(modifiedProd ? modifiedProd.title : "");
  // const [isValidTitle, setIsValidTitle] = useState(true)
  // const [imageURL, setImageURL] = useState(modifiedProd ? modifiedProd.imageUrl : "");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(modifiedProd ? modifiedProd.description : "");

  const dispatch = useDispatch();
  const [ formState, dispatchFormState ] = useReducer(
    formReducer, {
      inputValues: {
        title: modifiedProd ? modifiedProd.title : "",
        imageUrl: modifiedProd ? modifiedProd.imageUrl : "",
        description: modifiedProd ? modifiedProd.description : "",
        price: ""
      },
      inputValidities: {
        title: modifiedProd ? true : false,
        imageUrl: modifiedProd ? true : false,
        description: modifiedProd ? true : false,
        price: modifiedProd ? true : false
      },
      inputMods: {
        title: modifiedProd ? true : false,
        imageUrl: modifiedProd ? true : false,
        description: modifiedProd ? true : false,
        price: modifiedProd ? true : false
      },
      formIsValid: modifiedProd ? true : false
    })

    const submitHandler = () => {
      if( !formState.formIsValid ) {
        Alert.alert("Warning!!", "Please enter a valid title foor the product", [ {text: "ok"}])
      } else {
        const { title, description, imageUrl, price } = formState.inputValues
        if( modifiedProd ) {
          dispatch(productActions.updateProduct(prodId, title, description, imageUrl))
        } else {
          dispatch(productActions.createProduct(title, description, imageURL, +price))
        }

        navigation.goBack();
      }
    }

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
  }, [navigation, prodId]);

  const inputChangedHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      console.log('these are our params passed in: ', inputId, ":", inputValue, ":", inputValidity);
      
      dispatchFormState({
        type: UPDATE_FORM,
        value: inputValue,
        isValid: inputValidity,
        input: inputId
      })
    },
    [dispatchFormState],
  )

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoid}
      behavior="padding" 
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input 
            id='title'
            autoCapitalize='sentences'
            autoCorrect
            keyboardType='default'
            returnKeyType='next'
            label='Title'
            errorText="Please enter a valid title"
            onInputChanged={inputChangedHandler}
            initialValue={modifiedProd ? modifiedProd.title : ""}
            initiallyValid={modifiedProd ? true : false}
            required
          />
          <Input 
            id='imageUrl'
            label='Image URL'
            errorText="Please enter a valid image url"
            keyboardType='default'
            returnKeyType='next'
            onInputChanged={inputChangedHandler}
            initialValue={modifiedProd ? modifiedProd.imageUrl : ""}
            initiallyValid={modifiedProd ? true : false}
            required
          />

          { modifiedProd ? null : (
            <Input
              id='price'
              label='Price'
              errorText="Please enter a valid price"
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChanged={inputChangedHandler}
              initialValue={modifiedProd ? modifiedProd.proce : ""}
              initiallyValid={modifiedProd ? true : false}
              required
              min={0.1}
            />
          )}
          <Input 
            id='description'
            label='Description'
            errorText="Please enter a valid description"
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChanged={inputChangedHandler}
            initialValue={modifiedProd ? modifiedProd.description : ""}
            initiallyValid={modifiedProd ? true : false}
            required
            minLength={5}
          />
        </View> 
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1
  },
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
  },
  error: {
    color: 'red',
    marginVertical: 5
  }
})

export default EditProducts
