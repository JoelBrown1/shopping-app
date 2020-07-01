import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from '../actions/products';
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
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.id]
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if( currentQty > 1 ) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity -1, 
                    selectedCartItem.price, 
                    selectedCartItem.title,
                    selectedCartItem.sum - selectedCartItem.price
                )
                updatedCartItems = {
                    ...state.items, 
                    [action.id]: updatedCartItem
                }
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.id];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.price
            }
        case ADD_ORDER:
           return initialState; 
        case DELETE_PRODUCT:
            if( !state.items[action.pid] ){
                return state;
            }
            const updateditems = {...state.items};
            const itemTotal = state.items[action.pid].sum
            delete updateditems[action.pid];
            return {
                ...state,
                items: updateditems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state
}