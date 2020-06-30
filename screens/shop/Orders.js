import React, { useLayoutEffect } from 'react';
import {
    FlatList,
    Platform,
    Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const Orders = (props) => {
    const { navigation } = props;
    const orders = useSelector(state => state.orders.orders);
    let displayed = <View>
        <Text>You have no orders yet</Text>
    </View>
    /**
     * set the header options for the page
     */
    useLayoutEffect(() => {
        navigation.setOptions({
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

    if(orders.length > 0) {
        displayed = <FlatList 
            data={orders}
            keyExtractor={ item => item.id }
            renderItem={(itemData) => {
                console.log('what is in the itemData object: ', itemData.item);
                return <OrderItem date={itemData.item.readableDate} amount={itemData.item.totalAmount}/>
            }}
        />
    }

    return displayed
}


export default Orders
