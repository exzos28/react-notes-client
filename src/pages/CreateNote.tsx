import React, {useEffect, useState} from 'react';
import {useAxios} from "../core/Axios/useAxios";
import {Navigate, useLocation} from "react-router-dom";
import {Note} from "../core/Axios/AxiosContext";

export default function CreateNote() {
    const {createNote} = useAxios();
    const location = useLocation();
    const [fulfilled, setFulfilled] = useState<Note>();

    useEffect(() => {
        createNote().then(res => {
            if (res.success) {
                setFulfilled(res.right);
            }
        })
    }, [createNote])
    if (fulfilled) {
        return (
            <Navigate to={`/notes/${fulfilled.id}`}
                      state={{from: location}}
                      replace
            />
        )
    }
    // fetch create new note and redirect
    return null;
}
