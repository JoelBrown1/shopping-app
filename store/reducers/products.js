import PRODUCTS from '../../data/Products';

const initialState= {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter( product => product.ownerId === 'u1')
}

export default (state = initialState) => {
    return state;
}