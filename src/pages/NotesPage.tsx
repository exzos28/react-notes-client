import React, {useEffect, useState} from 'react';
import {useAxios} from "../core/Axios/useAxios";
import {Note} from "../core/Axios/AxiosContext";
import NoteList from "../components/NoteList";

export default function NotesPage() {
    const {getNotes} = useAxios();
    const [notes, setNotes] = useState<Note[]>();

    useEffect(() => {
        getNotes().then(res => {
            if (res.success)
                setNotes(res.right);
        })
    }, [getNotes]);
    if (!notes) {
        return null;
    }
    return (
        <div>
            <NoteList data={notes}/>
        </div>
    )
}
