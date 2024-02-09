import "./index.scss";

const Comment = ({ name, comment, userId }) => {
    let comName, com, comuserId;
    let firstLetter;

    if (name) {
        comName = name;
        firstLetter = comName.slice(0, 1);
    }
    if (comment) {
        com = comment;
    }
    if (userId) {
        comuserId = userId;
        firstLetter = comuserId.slice(0, 1);
    }


    return (
        <li className="comment">
            <div className="userIcon" style={{backgroundColor: comuserId ? "green" : "rgb(220, 89, 18)"}}><p>{firstLetter}</p></div>
            <div className="mainComment" style={{borderBottom: comuserId ? "1.5px solid green" : "1.5px solid rgb(220, 89, 18)"}}>
                <h4>{comName || comuserId} {comuserId && <span>registered</span>}</h4>
                <p>{com}</p>
            </div>
        </li>
    );
};

export default Comment;