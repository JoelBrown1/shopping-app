import React, { useCallback, useLayoutEffect, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    Text,
    View,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

import * as orderActions from '../../store/actions/orders';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Orders = (props) => {
    const { navigation } = props;
    const orders = useSelector(state => state.orders.orders);
    let displayed = <View>
        <Text>You have no orders yet</Text>
    </View>
    const [isLoading, setIsLoading] = useState(false)
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
    }, [navigation]);

    const dispatch = useDispatch();

    const loadOrders = useCallback( async () => {
        setIsLoading(true);
        await dispatch(orderActions.fetchOrders());
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        loadOrders();
        
    }, [dispatch, loadOrders])

    if( isLoading ) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }
    if(orders.length > 0) {
        displayed = <FlatList 
            data={orders}
            keyExtractor={ item => item.id }
            renderItem={(itemData) => {
                return (<OrderItem 
                    date={itemData.item.readableDate} 
                    amount={itemData.item.totalAmount} 
                    items={itemData.item.cartItems} 
                />)
            }}
        />
    }

    return displayed
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Orders
