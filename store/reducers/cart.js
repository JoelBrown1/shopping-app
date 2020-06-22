import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item'
const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addProduct = action.product;
            const prodId = addProduct.id;
            const prodPrice = addProduct.price;
            const prodTitle = addProduct.title;

            let cartItem;

            if(state.items[addProduct.id]) {
                cartItem = new CartItem(
                    state.items[prodId].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[prodId].sum + prodPrice,
                )
                
            } else {
                cartItem = new CartItem( 1, prodPrice, prodTitle, prodPrice );
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [prodId]: cartItem
                },
                totalAmount: state.totalAmount + prodPrice
            }
    }
    return state
}