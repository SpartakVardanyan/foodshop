import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals"
import "./ResponsiveIndex.scss";

const Meals = () => {
    return (
        <>
            <MealsSummary/>
            <AvailableMeals />
        </>
    );
};

export default Meals;