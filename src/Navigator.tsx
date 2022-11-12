import React from "react";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {AuthProvider} from "./core/Auth/AuthProvider";
import {Layout} from "./Layout";
import {RequireAuth} from "./core/Auth/RequireAuth";
import LoginPage from "./pages/LoginPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import {useAuth} from "./core/Auth/useAuth";
import AxiosProvider from "./core/Axios/AxiosProvider";
import NotesPage from "./pages/NotesPage";
import CreateNote from "./pages/CreateNote";
import NotePage from "./pages/NotePage";

export default function Navigator() {
    return (
        <BrowserRouter>
            <AxiosProvider>
                <AuthProvider>
                    <Router/>
                </AuthProvider>
            </AxiosProvider>
        </BrowserRouter>
    );
}

const Router = () => {
    const auth = useAuth();
    if (!auth.initialized) {
        return null;
    }
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <NotesPage/>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/new"
                    element={
                        <RequireAuth>
                            <CreateNote/>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/notes/:id"
                    element={
                        <RequireAuth>
                            <NotePage/>
                        </RequireAuth>
                    }
                />
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
        </Routes>
    )
}

