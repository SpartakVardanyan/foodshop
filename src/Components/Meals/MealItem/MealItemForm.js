import { useRef, useState } from "react";
import Input from "../../UI/Input";
import "./MealItemForm.scss";

const MealItemForm = ({ id, addToCart }) => {
    const inputRef = useRef();
    const [buy, setBuy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = +inputRef.current.value;

        inputRef.current.value = 1;
        addToCart(value);
    };

    function buyItem() {
        setBuy(true);
        setTimeout(() => {
            setBuy(false);
        }, 100);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Input 
                ref={inputRef}
                label="Amount"
                input={{
                    id,
                    type: "number",
                    min: "1",
                    max: "50",
                    inputmode: "numeric",
                    defaultValue: 1
                }}
            />
            <button onClick={buyItem} style={{background: buy && "#335c16", transform: buy && "scale(1.1)"}}>+</button>
        </form>
    );
};

export default MealItemForm;