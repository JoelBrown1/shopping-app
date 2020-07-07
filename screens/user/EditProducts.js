import React, { useState, useLayoutEffect } from 'react'
import { Platform, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const EditProducts = (props) => {
  const {navigation, route} = props;
  
  const prodId = route.params.productId;
  const modifiedProd = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId))
  const [title, setTitle] = useState(modifiedProd ? modifiedProd.title : "");
  const [imageURL, setImageURL] = useState(modifiedProd ? modifiedProd.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(modifiedProd ? modifiedProd.description : "");

  const dispatch = useDispatch();

  const submitHandler = () => {
    if( modifiedProd ) {
      dispatch(productActions.updateProduct(prodId, title, description, imageURL))
    } else {
      dispatch(productActions.createProduct(title, description, imageURL, +price))
    }
  }

  // useLayoutEffect(() => {
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
  // }, [navigation, prodId, title, description,price, imageURL])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControls}>
          <Text style={styles.title}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => {setTitle(text)}}/>
        </View>
        <View style={styles.formControls}>
          <Text style={styles.title}>Image URL</Text>
          <TextInput style={styles.input} value={imageURL} onChangeText={(text) => {setImageURL(text)}}/>
        </View>
        { modifiedProd ? null : (
          <View style={styles.formControls}>
            <Text style={styles.title}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={(text) => {setPrice(text)}}/>
          </View>
        )}
        <View style={styles.formControls}>
          <Text style={styles.title}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={(text) => {setDescription(text)}}/>
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
