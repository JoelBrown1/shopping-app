import React, { useLayoutEffect } from 'react'
import { Button, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'

import * as productActions from '../../store/actions/products'

import Colors from '../../constants/Colors'

const UserProducts = (props) => {
    const { navigation } = props;
    const userProducts = useSelector(state => state.products.userProducts)

    const editProduct = (prodId, prodTitle='') => {
        console.log("this is the title prop: ", prodTitle);
        navigation.navigate(
            {
                name: 'EditProducts', 
                params: {
                    productId: prodId,
                    title: prodTitle !== '' ? `Edit ${prodTitle}` : "Add Product"
                }
            }
        )
    }

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
            },
            headerRight: () => {
                return (
                    <HeaderButtons 
                            HeaderButtonComponent={CustomHeaderButton}
                    >
                        <Item 
                            title='Add Products' 
                            iconName={Platform.OS === 'android' ? 'md-create': 'ios-create'}
                            onPress={() => {
                                navigation.navigate(
                                    {
                                        name:'EditProducts',
                                        params: {
                                            title: 'Add Product'
                                        }
                                    }
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

    const selectItemHandler = (productId, title) => {
        console.log(`selected ${productId} - ${title}`)
    }
    const dispatch = useDispatch()
    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem 
                key={itemData.item.title+itemData.item.id}
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{
                    editProduct(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="Edit Item" onPress={()=>{
                    editProduct(itemData.item.id, itemData.item.title)
                }}/>
                <Button color={Colors.primary} title="Delete item" onPress={()=>{
                    dispatch(productActions.deleteProduct(itemData.item.id));
                }}/>
            </ProductItem>
            }
        />

    )
}

export default UserProducts

