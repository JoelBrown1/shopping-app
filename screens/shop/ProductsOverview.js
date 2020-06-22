import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton'

import * as cartActions from '../../store/actions/cart'

const ProductsOverview = (props) => {
    const { navigation } = props;
    const products = useSelector(state => state.products.availableProducts);

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
            }
        })
        // return () => {
        //     cleanup
        // };
    }, [navigation])
    navigation.setOptions({

    })

    const dispatch = useDispatch();
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetails={()=>{navigation.navigate({
                    name: 'ProductDetails',
                    params: {
                        productId: itemData.item.id,
                        title: itemData.item.title
                    }
                })}}
                onAddToCart={()=>{
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />}
        />
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverview

