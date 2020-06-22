import React from 'react'
import { 
    Text,
    TouchableOpacity, 
    View, 
    StyleSheet, 
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useLinkProps } from '@react-navigation/native';

const CartItem = (props) => {
    const {title, price, quantity} = props;
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>QTY: {quantity}</Text>
                <Text style={styles.data}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.data}>${price.toFixed(2)}</Text>
                <TouchableOpacity
                    onPress={props.onRemove}
                    style={styles.trashContainer}
                >
                    <Ionicons 
                        name={ Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginRight: 10
    },
    data: {        
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    trashContainer: {
        marginLeft: 20
    }
})

export default CartItem

