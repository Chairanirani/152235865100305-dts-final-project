import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../configs/Firebase";

const ProtectedRoute = ({children, loginOnly = true}) => {
    const [user] = useAuthState(auth);

    if(user && !loginOnly){
        return <Navigate to={'/'} />
    }

    if(!user && loginOnly){
        return <Navigate to={'/signin'} />
    }

    return children;

}

export default ProtectedRoute;