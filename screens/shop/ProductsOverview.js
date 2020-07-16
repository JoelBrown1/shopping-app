import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors'


const ProductsOverview = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            await dispatch( productActions.fetchProducts() );
        } catch(err) {
            console.log('there was an error: ', err);
            setHasError(true);
        }
        
        setIsLoading(false);
    }, [dispatch, setIsLoading, setHasError])
    
    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);
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
    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }
    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found</Text>
            </View>
        )
    }
    if( !isLoading && hasError ) {
        return (
            <View style={styles.centered}>
                <Text>The server isn't responding: please try again later</Text>
                <Button title="try again" onPress={loadProducts} color={Colors.primary}/>
            </View>
        )
    }
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
    centered:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ProductsOverview

