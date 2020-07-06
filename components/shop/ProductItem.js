import React from 'react'
import { 
    Image, 
    Platform,
    Text, 
    TouchableOpacity,
    TouchableNativeFeedback,
    View, 
    StyleSheet 
} from 'react-native'

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21 ) {
        TouchableCmp = TouchableNativeFeedback
    }

    /**
     * The TouchableCom can only have a single child element in it
     * that's why there is a nesting <View> element wrapping all the other 
     * parts of this structure.
     */

    return (
        <View style={styles.product}>
            <View style={styles.touchableContainer}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>$ {props.price.toFixed(2)} </Text>
                        </View>
                        <View style={styles.actions}>
                            { props.children }
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 300,
        margin: 20,
        
    },
    touchableContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
})

export default ProductItem

