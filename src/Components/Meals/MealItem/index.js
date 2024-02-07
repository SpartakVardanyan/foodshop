import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Providers/mealsSlice";
import MealItemForm from "./MealItemForm";
import "./index.scss";

const MealItem = ({ name, description, id, price, sale }) => {
    const loggedIn = useSelector(state => state.users.loggedIn);
    const dispatch = useDispatch();
    const imageId = id.slice(1);
    let saledPrice = 0;

    if (sale) {
        saledPrice = Number(price - sale).toFixed(2);
    }

    let imageRef;
    if (imageId === "0") {
        imageRef = require(`../MealsData/images/${imageId}.jpeg`);
    } else {
        imageRef = require(`../MealsData/images/${imageId}.jpg`);
    }

    const addToCartHandler = (amount) => {
        if(loggedIn && saledPrice !== 0) {
            price = saledPrice;
        }
        const newMeal = { id, name, price, amount };
        dispatch(addToCart(newMeal));
    };


    return (
        <li className="meal">
            <div>
                <h3>{name}</h3>
                <img alt="anything" className="foodImg" src={imageRef} />
                <div className="description">{description}</div>
                <div className="price">
                    {loggedIn && sale && <><span className="sale">${price}</span> ${saledPrice}</>}
                    {loggedIn && !sale && <>${price}</>}
                    ${!loggedIn && price}
                </div>
            </div>
            <MealItemForm id={id} addToCart={addToCartHandler} />
        </li>
    );
};

export default MealItem;