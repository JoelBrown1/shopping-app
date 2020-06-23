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
            renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
        />
    }

    return displayed
}


export default Orders
