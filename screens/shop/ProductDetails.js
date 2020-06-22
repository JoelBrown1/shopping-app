import React from 'react'
import { 
    Button, 
    Image, 
    ScrollView, 
    Text, 
    View,
    Platform, 
    StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductDetails = (props) => {
    const { productId } = props.route.params;
    const { navigation } = props

    const dispatch = useDispatch()

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    
    /**
     * this is a different way to set the title of the page dynaically
     * it won't happen on the first render because the props aren't there yet
     */
    // navigation.setOptions({
    //     title: selectedProduct.title
    // });

    return (
        <ScrollView>
            <Image style={styles.prodImage} source={{uri:selectedProduct.imageUrl}}/>
            <View style={styles.buttonContainer}>
                <Button 
                    title="add to cart" 
                    color={Platform.OS==='android' ? Colors.primary : Colors.primary} 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    prodImage: {
        width: '100%',
        height: 300
    },
    buttonContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Platform.OS === 'android'? Colors.primary: "#fff",
        width: '30%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: "#888",
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
    }
})

export default ProductDetails

