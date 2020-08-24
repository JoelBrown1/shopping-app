import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.userToken;
        const userId = getState().auth.userId;
        const date = new Date()
        const url = `https://shopping-app-9a925.firebaseio.com/orders/${userId}.json`;
        const response = await fetch(
            url, {
                method: 'POST',
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({
                    cartItems, 
                    totalAmount,
                    date: date.toISOString()
                })
            }
        )

        const respData = await response.json();

        if(!response.ok) {
            throw new Error(response.message);
        }
        
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: respData.name, 
                items: cartItems, 
                amount: totalAmount,
                date: date
            }
        })
    }    
}

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.userToken;
        const userId = getState().auth.userId;
        try {
            const url = `https://shopping-app-9a925.firebaseio.com/orders/${userId}.json`;
            const response = await fetch(url, {
                method: "GET"
            });

            if(!response.ok) {
                console.log("we didn't get the orders in the actions");
                throw new Error("didn't get the orders...");
            }

            const respData = await response.json();
            const orders = [];

            for(const key in respData) {
                orders.push(new Order(
                    key,
                    respData[key].cartItems,
                    respData[key].totalAmount,
                    new Date(respData[key].date),
                ))
            }

            dispatch({
                type: SET_ORDERS,
                data: orders
            })
        } catch (err) {
            throw err;
        }
    }
}
