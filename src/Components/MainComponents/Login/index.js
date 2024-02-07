import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validate } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { logedIn } from "../../../Providers/usersSlice";
import { FaRegEye } from "react-icons/fa";
import "./Login.scss";

const Login = ({ loading }) => {
    const users = useSelector(state => state.users.users);
    const loggedIn = useSelector(state => state.users.loggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [passShown, setPassShown] = useState(false);

    function showPassword() {
        setPassShown(!passShown);
    }

    function navToFood() {
        navigate("/foodshop");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            try {
                const valid = await validate(email, password, setEmailError, setPasswordError, users);
                if (valid.answer && valid.uid) {
                    dispatch(logedIn(valid.uid));
                    localStorage.setItem("currentUser", valid.uid);
                    setEmail(""); setPassword("");
                    navigate("/foodshop");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            {loading && <div className="spinner"></div>}
            {loading === false && loggedIn === true && (<p className="loginError" onClick={() => navigate("/foodshop")}>You are also logged in.If you want to switch your account, please log out and try again to signup.Click here to go food page</p>)}
            {loading === false && loggedIn === false &&
                <form
                    className="Login"
                    onSubmit={handleSubmit}>
                    
                    <h1 onClick={navToFood}>f<span>oo</span>dsh<span>o</span>p<span>.</span>am</h1>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderBottom: emailError && "1px solid red" }}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}

                    <div className="pass">
                        <input
                            type={passShown ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderBottom: passwordError && "1px solid red" }}
                        />
                        <span className="eye" onClick={showPassword}><FaRegEye /></span>
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <button>Login</button>
                    <span><Link to="/signup">Don't have an account yet? Sign up here.</Link></span>
                </form >}
        </>
    );
};

export default Login;