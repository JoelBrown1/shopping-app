import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverview = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetails={()=>{console.log("veiw details function")}}
                onAddToCart={()=>{console.log('add to cart function')}}
            />}
        />
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverview

