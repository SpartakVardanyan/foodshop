import { Routes, Route } from "react-router-dom";
import MainMealsPage from "./Components/MainComponents/MainMealsPage";
import Signup from "./Components/MainComponents/Signup";
import Login from "./Components/MainComponents/Login";
import Comments from "./Components/MainComponents/Comments";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logedIn } from "./Providers/usersSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getUsers } from "./Providers/usersSlice";
import NotFound from "./Components/MainComponents/NotFound";

const firebaseConfig = {
    apiKey: "AIzaSyAzesqRIPKb7cz1ln-LYFEWZbwLzxID0Mk",
    authDomain: "foodshop04062024.firebaseapp.com",
    projectId: "foodshop04062024",
    storageBucket: "foodshop04062024.appspot.com",
    messagingSenderId: "793523953835",
    appId: "1:793523953835:web:76352f67177cee0fa9d7ee"
};

initializeApp(firebaseConfig);

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            dispatch(logedIn(true));
        }
    }, [dispatch]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const db = getFirestore();
            const colRef = collection(db, "users");
            const snapshot = await getDocs(colRef);
            const users = await snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
            dispatch(getUsers(users));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="App">
            <Routes basename="/foodshop">
                <Route exact path="/foodshop" element={<MainMealsPage />} />
                <Route path="/login" element={<Login setLoading={setLoading} loading={loading} />} />
                <Route path="/signup" element={<Signup setLoading={setLoading} loading={loading} />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;