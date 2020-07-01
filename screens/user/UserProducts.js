import React, { useLayoutEffect } from 'react'
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'

const UserProducts = (props) => {
    const { navigation } = props;
    const userProducts = useSelector(state => state.products.userProducts)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButtons 
                        HeaderButtonComponent={CustomHeaderButton}
                    >
                        <Item 
                            title='User Products' 
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

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem 
                key={itemData.item.title+itemData.item.id}
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                    console.log("onViewDetail isn't required for the userProducts screen")
                }}
                onAddToCart={() => {
                    console.log("onAddToCart isn't required for the userProducts screen")
                }}
            />}
        />

    )
}

export default UserProducts

