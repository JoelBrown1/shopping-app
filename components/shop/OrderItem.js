import React, { useState } from 'react'
import { Button,
    Text,
    View, 
    StyleSheet 
} from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Card from '../UI/Card'
import Colors from '../../constants/Colors';

const OrderItem = (props) => {
    const {amount, date, items } = props;
    const [ showDetails, setShowDetails ] = useState(false);
    
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.orderAmount}>$ {amount.toFixed(2)}</Text>
                <Text style={styles.orderDate}>{date}</Text>
            </View>
            <Button 
                title={showDetails ? "Hide Details" : "Show Details" }
                onPress={() => {
                    setShowDetails( prevState => !prevState)
                }}
                color={ Colors.primary }
            />
            { showDetails && <View style={styles.detailItem}>
                    {items.map( cartItem => {
                        return (<CartItem 
                            key={cartItem.key}
                            title={cartItem.title} 
                            sum={cartItem.sum} 
                            quantity={cartItem.quantity}
                            deletable={false}
                        />)
                    })}
                </View>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center",
        width: '100%',
        marginBottom: 15
    },
    orderAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    orderDate: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: "#888"
    },
    detailItem: {
        width: "100%"
    }
})

export default OrderItem