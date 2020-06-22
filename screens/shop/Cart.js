import React from 'react';
import { useSelector } from 'react-redux'
import { 
    Button,
    FlatList,
    Text, 
    View, 
    StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Cart = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
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
        
        return transformedItems;
    })
    
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount }>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button 
                    color={Colors.accent}
                    title="order now" 
                    onPress={() => {
                        console.log("order now was pressed");
                    }}
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={ itemData => <View>
                    <Text>{itemData.item.title}</Text>
                </View>}
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

