import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {useAxios} from "../Axios/useAxios";
import {User} from "../Axios/AxiosContext";

export function AuthProvider({children}: { children: ReactNode }) {
    const {instance, getMe} = useAxios();
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState<User>();


    const fetchUser = useCallback(async () => {
        setLoading(true);
        const key = window.localStorage.getItem(STORAGE_KEY);
        if (key) {
            const user = await getMe();
            if (user.success) {
                setUser(user.right);
            }
        } else {
            setUser(undefined);
        }
        setLoading(false);
    }, [getMe]);


    const login = async (accessToken: string) => {
        window.localStorage.setItem(STORAGE_KEY, accessToken);
        await fetchUser();
    };

    const logout = useCallback(async () => {
        window.localStorage.removeItem(STORAGE_KEY)
        await fetchUser();
    }, [fetchUser]);


    const registerInterceptors = useCallback(() => {
        instance.interceptors.request.use(
            config => {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${window.localStorage.getItem(STORAGE_KEY)}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            response => {
                return response;
            },
            raw => {
                if (raw.response.status === 401) {
                    // noinspection JSIgnoredPromiseFromCall
                    logout();
                }
                return raw;
            }
        );
    }, [instance.interceptors.request, instance.interceptors.response, logout])

    useEffect(() => {
        registerInterceptors();
        // noinspection JSIgnoredPromiseFromCall
        fetchUser().then(() => setInitialized(true));
    }, [fetchUser, registerInterceptors]);


    const value = {user, login, logout, initialized, loading};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const STORAGE_KEY = 'ACCESS_TOKEN';
