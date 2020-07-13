import React, { useState, useLayoutEffect } from 'react'
import {Alert, Platform, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const EditProducts = (props) => {
  const {navigation, route} = props;
  
  const prodId = route.params.productId;
  const modifiedProd = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId))
  const [title, setTitle] = useState(modifiedProd ? modifiedProd.title : "");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageURL, setImageURL] = useState(modifiedProd ? modifiedProd.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(modifiedProd ? modifiedProd.description : "");

  const dispatch = useDispatch();

  const submitHandler = () => {
    if( !titleIsValid ) {
      Alert.alert("Warning", "there is an error", [{text: 'ok'}])
      return;
    }
    if( modifiedProd ) {
      dispatch(productActions.updateProduct(prodId, title, description, imageURL))
    } else {
      dispatch(productActions.createProduct(title, description, imageURL, +price))
    }
    navigation.goBack();
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
  }, [navigation, prodId, title, description,price, imageURL]);

  const textChangeHandler = (text, id) => {
    console.log("what is the id: ", id);
    console.log('what is the title: ', title);
    if(text.trim().length === 0) {
      setTitleIsValid(false)
    } else {
      setTitleIsValid(true)
    }
    setTitle(text);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControls}>
          <Text style={styles.title}>Title</Text>
          <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={textChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log('title has ended editing')}
            onSubmitEditing={() => console.log('submit editing has been done')}
            />
            { !titleIsValid && <Text>Please enter a valid title</Text>}
        </View>
        <View style={styles.formControls}>
          <Text style={styles.title}>Image URL</Text>
          <TextInput 
            style={styles.input} 
            value={imageURL} 
            onChangeText={(text) => {setImageURL(text)}}
            keyboardType="default"
            />
        </View>
        { modifiedProd ? null : (
          <View style={styles.formControls}>
            <Text style={styles.title}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={price} 
              onChangeText={(text) => {setPrice(text)}}
              keyboardType="decimal-pad"
              />
          </View>
        )}
        <View style={styles.formControls}>
          <Text style={styles.title}>Description</Text>
          <TextInput 
            style={styles.input} 
            value={description} 
            onChangeText={(text) => {setDescription(text)}}
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
