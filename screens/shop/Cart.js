import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { 
    ActivityIndicator,
    Button,
    FlatList,
    Text, 
    View, 
    StyleSheet, 
} from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card'

import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'


const Cart = () => {
    const [isLoading, setIsLoading] = useState(false)
    // add error ahndling 
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

    const sendOrderhandler = async () => {
        setIsLoading(true);
        await dispatch( ordersActions.addOrder(cartItems, cartTotalAmount ) );
        setIsLoading(false);
    }

    const removeFromCart = (data) => {
        console.log("this is the removed data: ", data )
        dispatch(cartActions.removeFromCart(data.key));
    }
    
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount }>${Math.round(cartTotalAmount.toFixed(2) * 100 / 100)}</Text></Text>
                { isLoading ?  <ActivityIndicator size="small" color={Colors.primary} /> : <Button 
                        color={Colors.accent}
                        title="order now" 
                        onPress={sendOrderhandler}
                        disabled={cartItems.length === 0}
                    /> 
                }
                
                
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.key}
                renderItem={ itemData => <CartItem
                    title={itemData.item.title}
                    sum={itemData.item.sum}
                    quantity={itemData.item.quantity}
                    deletable={true}
                    onRemove={() => removeFromCart(itemData.item)}
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

