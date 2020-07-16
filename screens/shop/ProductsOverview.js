import React, { useLayoutEffect, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors'

const ProductsOverview = (props) => {
    useEffect(() => {
        dispatch( productActions.fetchProducts() )
        return () => {
            console.log("the cleanup should go here if any is required");
        }
    }, [dispatch]);
    /**
     * set the header options for the page
     */
    useLayoutEffect(() => {
        console.log("useLayoutEffect was called");
        navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons 
                        HeaderButtonComponent={CustomHeaderButton}
                    >
                        <Item 
                            title='cart' 
                            iconName={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
                            onPress={() => {
                                navigation.navigate(
                                    'Cart'
                                )
                            }}
                        />
                    </HeaderButtons>
                )
            },
            headerLeft: () => {
                return (
                    <HeaderButtons 
                        HeaderButtonComponent={CustomHeaderButton}
                    >
                        <Item 
                            title='Orders' 
                            iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'}
                            onPress={() => {
                                navigation.toggleDrawer()
                            }}
                        />
                    </HeaderButtons>
                )
            },        })
        // return () => {
        //     cleanup
        // };
    }, [navigation])
    

    const { navigation } = props;
    const products = useSelector(state => state.products.availableProducts);

    const selectItemHandler = (productId, title) => {
        navigation.navigate({
            name: 'ProductDetails',
            params: {
                productId: productId,
                title: title
            }
        })
    }

    const dispatch = useDispatch();
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="View Details" onPress={()=>{
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}/>
                <Button color={Colors.primary} title="Add To Cart" onPress={()=>{
                    dispatch(cartActions.addToCart(itemData.item));
                }}/>
            </ProductItem>}
        />
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverview

