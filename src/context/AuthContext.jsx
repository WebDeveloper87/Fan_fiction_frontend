import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("JWT_ACCESS_TOKEN");
        setIsAuth(false);
        navigate("/");
    };

    const checkAuth = async () => {

        const token = localStorage.getItem("JWT_TOKEN");
        const refreshToken = localStorage.getItem("JWT_ACCESS_TOKEN");

        if (!token || !refreshToken) {
            setIsAuth(false);
            setLoading(false);
            return;
        }

        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token })
            });

            if (!res.ok) throw new Error();

            setIsAuth(true);

        } catch {

            try {

                const res = await fetch(`${process.env.REACT_APP_API_URL}auth/refresh`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refreshToken })
                });

                if (!res.ok) throw new Error();

                const data = await res.json();

                localStorage.setItem("JWT_TOKEN", data.accessToken);

                setIsAuth(true);

            } catch {

                setIsAuth(false);

                localStorage.removeItem("JWT_TOKEN");
                localStorage.removeItem("JWT_ACCESS_TOKEN");

            }

        }

        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};