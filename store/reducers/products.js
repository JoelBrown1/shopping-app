import PRODUCTS from '../../data/Products';
import { Switch } from 'react-native-gesture-handler';

import { DELETE_PRODUCT } from '../actions/products'

const initialState= {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter( product => product.ownerId === 'u1')
}

export default (state = initialState,  actions) => {
    switch(actions.type) {
        case DELETE_PRODUCT:
            console.log('should be deleting this product: ', actions.pid)
            const newUserProducts = state.userProducts.filter(product => product.id !== actions.pid)
            const newProducts = state.availableProducts.filter(product => product.id !== actions.pid)
            return {
                ...state,
                availableProducts: newProducts,
                userProducts: newUserProducts
            };
        default: 
            return state
    }
}