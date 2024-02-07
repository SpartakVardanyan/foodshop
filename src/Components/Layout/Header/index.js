import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import CartButton from "./CartButton";
import { useDispatch, useSelector } from "react-redux";
import { logedIn } from "../../../Providers/usersSlice";
import { Link } from "react-router-dom";
import wallpaper from "../../assets/Media/wallpaper.jpg";
import "./index.scss";

const Header = ({ onShowCart }) => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.users.loggedIn);

    function handleScroll() {
        const currentScrollPos = window.scrollY;
        setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });


    function logout() {
        localStorage.removeItem("currentUser");
        dispatch(logedIn(false));
        setTimeout(() => {
            window.location.reload();
        }, 200);
    };

    function goUp(e) {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            <header className="header" style={{ top: visible ? 0 : "-100px" }}>
                <h1 onClick={goUp}>F<span>OO</span>DSH<span>O</span>P</h1>
                <CartButton onShowCart={onShowCart} loggedIn={loggedIn} />
                {loggedIn === false && <div className="userAcc">
                    <p><Link to="/login" className="logLink">Login</Link></p>
                    <p><Link to="/signup" className="signLink">Signup</Link></p>
                </div>}
                {loggedIn !== false && <p onClick={logout} className="logoutIcon"><IoIosLogOut /></p>}
            </header>
            <div className="main-image">
                <img src={wallpaper} alt='food-img' />
            </div>
        </>
    );
};

export default Header;