import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./index.scss";

const CartButton = ({ onShowCart, loggedIn }) => {
    const items = useSelector(state => state.cartItems.items);
    const cartItemsCount = items.reduce((acc, cur) => {
        return acc += cur.amount;
    }, 0);

    return (
        <button className={loggedIn ? "cart-button-loggedIn" : "cart-button"} onClick={onShowCart}>
                <AiOutlineShoppingCart className="cart-button-icon"/>
                <span>{cartItemsCount}</span>
        </button >
    );
};

export default CartButton;