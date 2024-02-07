import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { addToCart, removeFromCart } from "../../Providers/mealsSlice";
import "./index.scss";

const Cart = ({ onCloseCart }) => {
    const items = useSelector(state => state.cartItems.items);
    const totalPrice = useSelector(state => state.cartItems.totalPrice);
    const dispatch = useDispatch();

    const hasItems = items.length > 0;

    const cartItemAddHandler = (item) => {
        dispatch(addToCart({ ...item, amount: 1 }));
    };

    const cartItemRemoveHandler = (id) => {
        dispatch(removeFromCart({ id }));
    };

    const cartItems = items.map((item) => (
        <CartItem
            key={item.id}
            {...item}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
    ));

    return (
        <Modal onClose={onCloseCart}>

            <ul className="cart-items">
                {cartItems}
            </ul>
            <div className="total">
                <span>Total Price</span>
                <span>${totalPrice}</span>
            </div>
            <div className="actions">
                <button className="button-alt" onClick={onCloseCart}>
                    Close
                </button>
                {hasItems && <button className="button">Order</button>}
            </div>

        </Modal >
    );
};

export default Cart;