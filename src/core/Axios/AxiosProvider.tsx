import React, {ReactNode, useCallback, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../constants";
import {AxiosContext, Note, User} from "./AxiosContext";
import {success} from "../fp/Either";

export default function AxiosProvider({children}: { children: ReactNode }) {
    const [instance] = useState(() => (
        axios.create({
            baseURL: API_BASE_URL,
        })
    ));

    const getMe = useCallback(() => {
        return instance.get<User>('user/me').then(res => success(res.data));
    }, [instance]);

    const createNote = useCallback(() => {
        return instance.post<Note>('memos', {content: {}}).then(res => success(res.data));
    }, [instance]);

    const updateNoteById = useCallback((id: string, content: object) => {
        return instance.put<Note>(`memos/${id}`, {content}).then(res => success(res.data));
    }, [instance]);

    const getNotes = useCallback(() => {
        return instance.get<Note[]>('memos').then(res => success(res.data));
    }, [instance]);

    const getNoteById = useCallback((id: string) => {
        return instance.get<Note>(`memos/${id}`).then(res => success(res.data));
    }, [instance]);

    const deleteNoteById = useCallback((id: string) => {
        return instance.delete<Note>(`memos/${id}`).then(res => success(res.data));
    }, [instance]);

    const value = {instance, getMe, getNotes, getNoteById, createNote, updateNoteById, deleteNoteById}

    return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
}
