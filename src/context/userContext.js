
import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;