import React, {useCallback, useEffect, useState} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from "../core/Auth/useAuth"

export default function OAuth2RedirectHandler() {
    const location = useLocation()
    const auth = useAuth()
    const [loading, setLoading] = useState(true)
    const [fulfilled, setFulfilled] = useState(false)

    const getUrlParameter = useCallback((param: string) => {
        const result = param.replace(/\[/, '\\[').replace(/]/, '\\]')
        const regex = new RegExp('[\\?&]' + result + '=([^&#]*)')

        const results = regex.exec(location.search)
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
    }, [location.search])

    useEffect(() => {
        setLoading(true)
        const token = getUrlParameter('token')
        const error = getUrlParameter('error')
        console.log(token, error);
        if (error) {
            setFulfilled(false)
            setLoading(false)
        } else {
            auth.login(token).then(() => {
                setFulfilled(true)
                setLoading(false)
            })
        }
    }, [auth, getUrlParameter])

    if (loading) {
        return null
    }

    if (fulfilled) {
        return (
            <Navigate to="/"
                      state={{from: location}}
                      replace
            />
        )
    }
    return (
        <Navigate
            to="/login"
            state={{from: location}}
            replace
        />
    )
}

