import { useState, useCallback, useEffect } from "react";
import Header from "../Layout/Header";
import Meals from "../Meals";
import Cart from "../Cart";
import Footer from "../Layout/Footer";
import { GoChevronUp } from "react-icons/go";

const MainMealsPage = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [upShown, setUpShown] = useState(false);

    function handleScroll() {
        setPrevScrollPos(window.scrollY);
        if(prevScrollPos > 400) {
            setUpShown(true);
        } else {
            setUpShown(false);
        }
    }

    function goUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    
    
    const showCartHandler = useCallback(() => {
        setCartIsShown(true);
    }, []);

    const hideCartHandler = useCallback(() => {
        setCartIsShown(false);
    }, []);

    return (
        <div className="MainMealsPage">
            {cartIsShown && <Cart onCloseCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals />
            </main>
            {<div className={`up ${upShown ? "visible" : ""}`} onClick={goUp}><GoChevronUp /></div>}
            <Footer />
        </div>
    );
};

export default MainMealsPage;