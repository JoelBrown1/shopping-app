import PRODUCTS from '../../data/Products';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products'

import Product from '../../models/productModel';

const initialState= {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter( product => product.ownerId === 'u1')
}

export default (state = initialState,  actions) => {
    switch(actions.type) {
        case SET_PRODUCTS:
            console.log("inside the set products reducer: ", actions.products);
            return {
                ...state,
                availableProducts: actions.products,
                userProducts: actions.products.filter( product => product.ownerId === 'u1')
            }
        case DELETE_PRODUCT:
            const newUserProducts = state.userProducts.filter(product => product.id !== actions.pid)
            const newProducts = state.availableProducts.filter(product => product.id !== actions.pid)
            return {
                ...state,
                availableProducts: newProducts,
                userProducts: newUserProducts
            };

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id, 
                'u1', 
                actions.productData.title,
                actions.productData.imageUrl,
                actions.productData.description,
                actions.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex( prod => prod.id === actions.productData.pid );
            const updatedProd = new Product(
                actions.productData.pid,
                state.userProducts[prodIndex].ownerId,
                actions.productData.title,
                actions.productData.imageUrl,
                actions.productData.description,
                state.userProducts[prodIndex].price
            )
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[prodIndex] = updatedProd;

            const availableProdIndex = state.availableProducts.findIndex(prod => prod.id === actions.productData.pid);
            const updatedAvaiableProds = [...state.availableProducts];
            updatedAvaiableProds[availableProdIndex] = updatedProd

            return {
                ...state,
                availableProducts: updatedAvaiableProds,
                userProducts: updatedUserProducts
            }

        default: 
            return state
    }
}