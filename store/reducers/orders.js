import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order'

const initialState = {
    orders: []
}

export default ( state= initialState, action ) => {
    switch(action.type) {
        case ADD_ORDER:
            const id = new Date().toString();
            const date = new Date();
            const newOrder = new Order(
                id, 
                action.orderData.items, 
                action.orderData.amount, 
                date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}