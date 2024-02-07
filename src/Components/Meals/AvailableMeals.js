import Card from "../UI/Card";
import MealItem from "./MealItem";
import "./AvailableMeals.scss";
import { MEALS } from "./MealsData/Meals";

const AvailableMeals = () => {
    const pizzaList = MEALS.map((meal) => meal.type === "pizza" && <MealItem key={meal.id} {...meal} />);
    const saladList = MEALS.map((meal) => meal.type === "salad" && <MealItem key={meal.id} {...meal} />);
    const burgerSandwichList = MEALS.map((meal) => meal.type === "burger-sandwich" && <MealItem key={meal.id} {...meal} />);
    const pastaList = MEALS.map((meal) => meal.type === "pasta" && <MealItem key={meal.id} {...meal} />);
    const meatList = MEALS.map((meal) => meal.type === "meat" && <MealItem key={meal.id} {...meal} />);

    return (
        <section className="meals">
            <Card>
                <ul>
                    <h3>Pizzas</h3>
                    <hr />
                    <div className="pizzas">
                        {pizzaList}
                    </div>
                </ul>

                <ul>
                    <h3>Salads</h3>
                    <hr />
                    <div className="salads">{saladList}</div>
                </ul>

                <ul>
                    <h3>Burgers and Sandwiches</h3>
                    <hr />
                    <div className="burgerSandwiches">{burgerSandwichList}</div>
                </ul>

                <ul>
                    <h3>Pastas</h3>
                    <hr />
                    <div className="pastas">{pastaList}</div>
                </ul>

                <ul>
                    <h3>Meats</h3>
                    <hr />
                    <div className="pastas">{meatList}</div>
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;