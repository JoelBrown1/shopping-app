export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const url = "https://shopping-app-9a925.firebaseio.com/orders/u1.json";
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
