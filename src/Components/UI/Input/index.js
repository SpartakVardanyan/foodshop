import { forwardRef } from "react";
import "./index.scss";

const Input = forwardRef(({label, input}, ref) => {
    function handleChange(e) {
        if(+e.target.value < 1) {
            e.target.value = 1;
        } else if(e.target.value > 10) {
            e.target.value = 10;
        }
    }
    
    return (
        <div className="input">
            <label htmlFor={input.id}>{label}</label>
            <input ref={ref} onChange={handleChange} {...input} />
        </div>
    );
});

export default Input;