import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../store/actions/cart'

const ProductsOverview = (props) => {
    const { navigation } = props;
    const products = useSelector(state => state.products.availableProducts);

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

