import { onAuthStateChanged, signOut } from "firebase/auth";
import { authFirebase } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { dbFirebase } from "../utils/firebase";
import { FIREBASE_USER_COLLECTION } from "../const/User";
import { ROLE, STATUS } from "../const/User";
import { useEffect, useState } from "react";
import RouterUrl from "../const/RouterUrl";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";
import { REGISTER_FLAG } from "../const/LocalStorage";

const PublicRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
            if (user) {
                const docRef = doc(dbFirebase, FIREBASE_USER_COLLECTION, user.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    const userData = docSnap.data();
                    if(userData.role === ROLE.BUSINESS && userData.status === STATUS.ACTIVE){
                        setAuthenticated(true);
                    }
                }
            }
            setLoading(false);
        });

        if(!localStorage.getItem(REGISTER_FLAG)){
            return () => unsubscribe();
        }

        return;
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    if (authenticated) {
        return <Navigate to={RouterUrl.HOME} replace />;
    }

    return children;
};

export default PublicRoute;