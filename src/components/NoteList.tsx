import React from 'react';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Note} from "../core/Axios/AxiosContext";
import {useNavigate} from "react-router-dom";

export type NoteListProps = {
    data: Note[];
}

export default function NoteList({data}: NoteListProps) {
    const navigate = useNavigate();
    return (
        <List sx={{bgcolor: 'background.paper'}}>
            {data.map(_ => {
                const content = _.content || {};
                const blocks = content.blocks || [];
                const elements = blocks.flatMap<string>(_ => {
                    if (_.data.text !== undefined) {
                        return [_.data.text];
                    }
                    return [];
                });
                const candidateText = elements.join(', ');
                const text = candidateText.length === 0 ? '-' : candidateText;
                const croppedText = text.length > 500 ? text.substring(0, 500) + "..." : text;
                const date = `${new Date(_.creationDate).toLocaleDateString()} ${new Date(_.creationDate).toLocaleTimeString()}`
                return (
                    <ListItem key={_.id}>
                        <ListItemButton onClick={() => navigate(`notes/${_.id}`)}>
                            <ListItemText
                                primary={croppedText}
                                secondary={date}
                            />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>

    )
}
