import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../Providers/usersSlice";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { validate } from "./validation";
import { FaRegEye } from "react-icons/fa";
import "./Signup.scss";


const Signup = ({ loading, setLoading }) => {
    useEffect(() => {
        const db = getFirestore();
        const colRef = collection(db, "users");
        setColRef(colRef);
    }, []);
    const [colRef, setColRef] = useState(null);
    const users = useSelector(state => state.users.users);
    
    const loggedIn = useSelector(state => state.users.loggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    const [passShown, setPassShown] = useState(false);
    const [repeatPassShown, setRepeatPassShown] = useState(false);

    function navToFood() {
        navigate("/foodshop");
    }

    return (
        <>
            {loading && <div className="spinner"></div>}
            {loading === false && loggedIn === true && (<p className="signupError" onClick={() => navigate("/foodshop")}>You are also logged in.If you want to switch your account, please log out and try again to signup.Click here to go food page</p>)}
            {loading === false && loggedIn === false &&
                <form className="Signup"
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            try {
                                setLoading(true);
                                const valid = await validate(name, surname, email, password, repeatPassword, setNameError, setSurnameError, setEmailError, setPasswordError, setRepeatPasswordError, users);

                                if (valid) {
                                    await addDoc(colRef, {
                                        data: { name, surname, email, password }
                                    });
                                    const newUser = { data: { name, surname, email, password } };
                                    dispatch(signupUser([newUser, ...users]));
                                    setName(""); setSurname(""); setEmail(""); setPassword(""); setRepeatPassword("");
                                    navigate("/login");
                                }
                            } catch (error) {
                                console.error(error);
                            } finally {
                                setLoading(false);
                            }
                        }
                    }
                >

                    <h1 onClick={navToFood}>f<span>oo</span>dsh<span>o</span>p<span>.</span>am</h1>

                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderBottom: nameError && "2px solid red" }}
                    />
                    {nameError && <p className="error-message">{nameError}</p>}

                    <input
                        type="text"
                        placeholder="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        style={{ borderBottom: surnameError && "2px solid red" }}
                    />
                    {surnameError && <p className="error-message">{surnameError}</p>}

                    <input
                        type="text"
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderBottom: emailError && "2px solid red" }}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}

                    <div className="pass">
                        <input
                            type={passShown ? "text" : "password"}
                            placeholder="password (min 6)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderBottom: passwordError && "2px solid red" }}
                        />
                        <span className="eye" onClick={() => setPassShown(!passShown)}><FaRegEye /></span>
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <div className="pass">
                        <input
                            type={repeatPassShown ? "text" : "password"}
                            placeholder="repeat password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            style={{ borderBottom: repeatPasswordError && "2px solid red" }}
                        />
                        <span className="eye" onClick={() => setRepeatPassShown(!repeatPassShown)}><FaRegEye /></span>
                    </div>
                    {repeatPasswordError && <p className="error-message">{repeatPasswordError}</p>}

                    <button>Signup</button>
                    <span><Link to="/login">Already have an account? Log in here.</Link></span>
                </form >
            }
        </>
    );
};

export default Signup;