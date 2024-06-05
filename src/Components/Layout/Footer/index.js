import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRef, useState } from "react";
import validate from "./validate";
import { IoLogoFacebook } from "react-icons/io5";
import { TfiTwitterAlt } from "react-icons/tfi";
import { FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";
import './index.scss';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const [loading, setLoading] = useState(false);
    const [showThanx, setShowThanx] = useState(false);

    const nameRef = useRef();
    const telephoneRef = useRef();
    const areaRef = useRef();

    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [commentError, setCommentError] = useState(false);

    const loggedIn = useSelector(state => state.users.loggedIn);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        const colRef = collection(db, "comments");
        const commentValue = areaRef.current.value;

        if (!loggedIn) {
            const name = nameRef.current.value;
            const phoneValue = telephoneRef.current.value;

            const valid = await validate(name, phoneValue, commentValue, setNameError, setPhoneError, setCommentError);

            if (valid) {
                try {
                    setLoading(true);
                    await addDoc(colRef, { name, phone: phoneValue, comment: commentValue });
                    e.target.reset();
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                    setShowThanx(true);
                    setTimeout(() => {
                        setShowThanx(false);
                    }, 2000);
                }
            }
        } else {
            if (commentValue.length === 0) {
                setCommentError("* Comment is required");
                return;
            }
            try {
                setLoading(true);
                setCommentError(false);
                const userId = localStorage.getItem("currentUser");
                await addDoc(colRef, { userId, comment: commentValue });
                e.target.reset();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setShowThanx(true);
                setTimeout(() => {
                    setShowThanx(false);
                }, 2000);
            }
        }
    }

    return (
        <footer className="Footer">
            <h3>CONTACT US</h3>
            <div className='mainFooter'>

                <div className="contact">
                    <h4>Getting in touch is easy!</h4>
                    <p>Tel: +7(977)-900-00-87</p>
                    <p>E-mail: spartak.vardanyan.2002@gmail.com</p>
                    <p>2345 Main Street Anywhere</p>
                    <div className='socIcons'>
                        <span><IoLogoFacebook /></span>
                        <span><TfiTwitterAlt /></span>
                        <span><FaLinkedin /></span>
                    </div>
                    <p className="lookComments" onClick={() => navigate("/comments")}>Look at the comments about us</p>
                </div>
                {!loading && <>
                    <form className="comment" onSubmit={handleSubmit}>
                        {showThanx && <p className="thanx" style={{ transition: "2s all" }}>Thank you for leaving a comment.</p>}
                        {loggedIn === false && <>
                            <input type="text" placeholder='Name' ref={nameRef} style={{ border: nameError && "1.2px solid red" }} />
                            <p className="error-message">{nameError}</p>
                            <input type="number" placeholder='Telephone' ref={telephoneRef} style={{ border: phoneError && "1.2px solid red" }} />
                            <p className="error-message">{phoneError}</p>
                        </>
                        }
                        <textarea placeholder='Comment' ref={areaRef} style={{ border: commentError && "1.2px solid darkred" }} />
                        <p className="error-message">{commentError}</p>

                        <button>Submit</button>
                    </form>
                </>}
                {loading && <div className="spinner"></div>}
            </div>
        </footer>
    );
};

export default Footer;