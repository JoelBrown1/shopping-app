import moment from 'moment';

class Order {
    constructor( id, cartItems, totalAmount, date) {
        this.id = id;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default Order;