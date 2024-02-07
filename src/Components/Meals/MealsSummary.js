import { useSelector } from "react-redux";
import "./MealsSummary.scss";


const MealsSummary = () => {
  const loggedIn = useSelector(state => state.users.loggedIn);

  return (
    <section className="summary">
      <h2>Delicious Food, Delivered To You</h2><br/>
      <p>
      Satisfy your cravings in an instant with our <strong>foodshop.am</strong>! From mouthwatering burgers to crispy fries, we've got your fast-food favorites covered. Order with a click, and enjoy speedy delivery to your doorstep. Quick, convenient, and always delicious. Make every meal a treat with our <strong>foodshop.am</strong>. Don't wait, indulge now!  
      </p>
      {!loggedIn && <p className="saleDescription"><strong>By signing up, you can enjoy increased sales.</strong></p>}
    </section>
  );
};

export default MealsSummary;