import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { 
    Button,
    FlatList,
    Text, 
    View, 
    StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

import CartItem from '../../components/shop/CartItem'

const Cart = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => {
        const transformedItems = [];
        for( const key in state.cart.items) {
            transformedItems.push({
                key: key,
                title: state.cart.items[key].title,
                price: state.cart.items[key].price,
                quantity:state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        
        return transformedItems.sort((a, b) => a.key > b.key ? 1 : -1);
    })
    
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount }>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button 
                    color={Colors.accent}
                    title="order now" 
                    onPress={() => {
                        dispatch( ordersActions.addOrder(cartItems, cartTotalAmount ) )
                    }}
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.key}
                renderItem={ itemData => <CartItem
                    title={itemData.item.title}
                    sum={itemData.item.sum}
                    quantity={itemData.item.quantity}
                    deletable={true}
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.key))
                    }}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',

    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    summaryAmount: {
        color: Colors.primary
    }
})

export default Cart

