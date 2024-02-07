import classes from "./CartItem.module.scss";

const CartItem = (props) => {
    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>${props.price}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onRemove}>-</button>
                    <span className={classes.amount}>{props.amount}</span>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    );
};

export default CartItem;