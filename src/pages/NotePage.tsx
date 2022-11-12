import React, {useCallback, useEffect, useState} from 'react';
import {RichTextEditor} from "../components/RichTextEditor";
import {useNavigate, useParams} from "react-router-dom";
import {useAxios} from "../core/Axios/useAxios";
import {Note} from "../core/Axios/AxiosContext";
import {API, } from "@editorjs/editorjs";
import {useDebouncedCallback} from "use-debounce";
import {Button, Grid} from "@mui/material";

export default function NotePage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {getNoteById, updateNoteById, deleteNoteById} = useAxios();
    const [fulfilled, setFulfilled] = useState<Note>();

    useEffect(() => {
        if (!id) {
            return;
        }
        getNoteById(id).then(res => {
            if (res.success)
                setFulfilled(res.right)
        })
    }, [getNoteById, id]);

    const onChange = useCallback(async (value: API) => {
        if (!id) {
            return;
        }
        value.saver.save().then(res => {
            updateNoteById(id, res)
        });
    }, [id, updateNoteById]);

    const onDelete = useCallback(async () => {
        if (!id) {
            return;
        }
        await deleteNoteById(id);
        navigate('/');
    }, [deleteNoteById, id, navigate]);

    const onDebounceChange = useDebouncedCallback(onChange, 100);

    if (!fulfilled) {
        return null;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={11} style={{paddingTop: 25}}>
                <RichTextEditor key={fulfilled.id} defaultValue={fulfilled.content} onChange={onDebounceChange}/>
            </Grid>
            <Grid item xs={1}>
                <Button color="error" onClick={onDelete}>Delete</Button>
            </Grid>
        </Grid>
    )
}
