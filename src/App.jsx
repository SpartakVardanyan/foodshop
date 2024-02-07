import { Routes, Route } from "react-router-dom";
import MainMealsPage from "./Components/MainComponents/MainMealsPage";
import Signup from "./Components/MainComponents/Signup";
import Login from "./Components/MainComponents/Login";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logedIn } from "./Providers/usersSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getUsers } from "./Providers/usersSlice";
import NotFound from "./Components/MainComponents/NotFound";

const firebaseConfig = {
    apiKey: "AIzaSyCcEva3ouomFpUtyzD7kghDgayX0DismVM",
    authDomain: "myfirebase-2024.firebaseapp.com",
    projectId: "myfirebase-2024",
    storageBucket: "myfirebase-2024.appspot.com",
    messagingSenderId: "46738208762",
    appId: "1:46738208762:web:2e30f99cd4f95eb13c1643",
    measurementId: "G-WM8Q1DVVVB"
};

initializeApp(firebaseConfig);

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if(localStorage.getItem("currentUser")) {
            dispatch(logedIn(true));
        }
    },[dispatch]);

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
            <Routes>
                <Route index element={<MainMealsPage />} />
                <Route path="/login" element={<Login setLoading={setLoading} loading={loading} />} />
                <Route path="/signup" element={<Signup setLoading={setLoading} loading={loading} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;