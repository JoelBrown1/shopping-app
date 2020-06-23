class Order {
    constructor( id, cartItems, totalAmount, date) {
        this.id = id;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}

export default Order;