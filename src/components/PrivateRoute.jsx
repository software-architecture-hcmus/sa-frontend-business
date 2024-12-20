import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase, dbFirebase } from "../utils/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_USER_COLLECTION, STATUS, ROLE } from "../const/User";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const/LocalStorage";
import { signOut } from "firebase/auth";
import RouterUrl from "../const/RouterUrl";
import Spinner from "./Spinner";
import UserContext from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
            if (user) {
                const docRef = doc(dbFirebase, FIREBASE_USER_COLLECTION, user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.status == STATUS.BANNED || userData.role !== ROLE.BUSINESS) {
                        setAuthenticated(false);
                        setMessage("Your account is banned or not a business!");                     
                    } else {
                        setAuthenticated(true);
                        setUser(user);
                    }
                }
            } else {
                setAuthenticated(false);
                setMessage("");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    if (!authenticated) {
        signOut(authFirebase);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        return <Navigate to={RouterUrl.LOGIN} state={{ from: location.pathname, message: message, success: false }} replace />;
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default PrivateRoute;