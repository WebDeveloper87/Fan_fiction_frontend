import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {Route, Routes} from "react-router-dom";
import {privatRoutes, publicRoute} from "../../router/routes";
import AuthPage from "../../pages/AuthPage";
import FanficsPage from "../../pages/FanficsPage";
import MainLayout from "../../layouts/MainLayout";

function AppRoutes() {

    const {isAuth, isLoading} = useContext(AuthContext)


    return (
        isAuth ? (
            <Routes>
                <Route path="/auth" element={<AuthPage />}/>
                <Route element={<MainLayout />}>
                    {privatRoutes.map(route => {
                        const Component = route.component;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<Component />}
                            />
                        );
                    })}
                    {publicRoute.map(route => {
                        const Component = route.component;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<Component />}
                            />
                        );
                    })}
                    <Route path="*" element={<FanficsPage />} />
                </Route>
            </Routes>
        ) : (
            <Routes>
                <Route path="/auth" element={<AuthPage />}/>
                <Route element={<MainLayout />}>
                {publicRoute.map(route => {
                    const Component = route.component;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Component />}
                        />
                    );
                })}
                </Route>
                <Route path="*" element={<AuthPage />} />
            </Routes>
        )
    )
}

export default AppRoutes
