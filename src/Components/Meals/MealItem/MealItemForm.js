import { useRef, useState } from "react";
import Input from "../../UI/Input";
import "./MealItemForm.scss";

const MealItemForm = ({ id, addToCart }) => {
    const inputRef = useRef();
    const [buy, setBuy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = +inputRef.current.value;

        addToCart(value);
    };

    function buyItem() {
        setBuy(true);
        setTimeout(() => {
            setBuy(false);
        }, 200);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Input 
                ref={inputRef}
                label="Amount"
                input={{
                    id,
                    type: "number",
                    step: 1,
                    defaultValue: 1
                }}
            />
            <button onClick={buyItem} style={{background: buy && "#335c16", transform: buy && "scale(1.1)"}}>+ Add</button>
        </form>
    );
};

export default MealItemForm;