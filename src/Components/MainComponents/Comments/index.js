import { useCallback, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../../Providers/commentsSlice"
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const Comments = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const coms = useSelector(state => state.comments.coms);
    const [comments, setComments] = useState(coms);

    const navigate = useNavigate();
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const db = getFirestore();
            const colRef = collection(db, "comments");
            const snapshot = await getDocs(colRef);
            const comments = await snapshot.docs.map((item) => ({ ...item.data() }));
            dispatch(getComments(comments));
            setComments(comments);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const commentsList = comments.map(item => <Comment key={item.number + "" + Number(Math.random() * 1000)} name={item.name || ""} userId={item.userId || ""} comment={item.comment} />);
    return (
        <div className="Comments">
            <span className="goBack" onClick={() => navigate("/foodshop")}>{"< Go back"}</span>
            <h1>Comments</h1>
            {loading && <div className="spinner"></div>}
            {!loading && <>
                <ul>
                    {commentsList}
                </ul>
            </>}
        </div>
    );
};

export default Comments;