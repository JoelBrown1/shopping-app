import React from 'react'
import { Button,
    Text,
    View, 
    StyleSheet 
} from 'react-native';
import { Platform } from 'react-native'
import Colors from '../../constants/Colors'

const OrderItem = (props) => {
    const {amount, date} = props;
    console.log("looking for date obj: ", date);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.orderAmount}>$ {amount.toFixed(2)}</Text>
                <Text style={styles.orderDate}>{date}</Text>
            </View>
            <Button 
                title="show" 
                onPress={() => {console.log('show button was pressed')}}
                color={ Colors.primary }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
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
    }
})

export default OrderItem