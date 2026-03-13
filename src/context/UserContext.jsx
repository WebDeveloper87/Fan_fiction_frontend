import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext();
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem("JWT_TOKEN"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("JWT_ACCESS_TOKEN"));

    const logout = () => {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("JWT_ACCESS_TOKEN");
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuth(false);
        navigate("/");
    };

    const checkAuth = async () => {
        if (!token || !refreshToken) {
            setIsAuth(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}auth/verify`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({token}),
            });

            if (!res.ok) throw new Error();

            setIsAuth(true);

        } catch {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}auth/refresh`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({refreshToken}),
                });

                if (!res.ok) throw new Error();

                const data = await res.json();

                localStorage.setItem("JWT_TOKEN", data.accessToken);
                setToken(data.accessToken);

                setIsAuth(true);
            } catch {
                logout();
            }
        }

        setLoading(false);
    };


    useEffect(() => {
        checkAuth();
    }, [token]);

    return (
        <UserContext.Provider
            value={{ isAuth, setIsAuth, user, setUser, token, refreshToken, setToken, setRefreshToken, loading, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};