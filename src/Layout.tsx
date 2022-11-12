import React from "react";
import {useAuth} from "./core/Auth/useAuth";
import {Outlet, } from "react-router-dom";
import ResponsiveAppBar from "./components/AppHeader";

export function Layout() {
    return (
        <div>
            <AuthStatus/>
            <Outlet/>
        </div>
    );
}

function AuthStatus() {
    const auth = useAuth();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <ResponsiveAppBar/>
    )
}
