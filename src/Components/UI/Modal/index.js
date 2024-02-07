import { createPortal } from "react-dom";
import "./index.scss";

const Backdrop = ({ onClose }) => {
    return <div className="backdrop" onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className="modal">
            <div className="content">{ children }</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onClose }) => {
    return createPortal(
        <>
            <Backdrop onClose={onClose}/>
            <ModalOverlay children={children} />
        </>
        , portalElement
    );
};

export default Modal;