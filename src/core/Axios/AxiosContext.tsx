import {createNullableContext} from "../context";
import {AxiosInstance} from "axios";
import {Either} from "../fp/Either";
import {OutputData} from "@editorjs/editorjs";

export type User = {
    name: string;
}

export type Note = {
    id: string;
    content: OutputData;
    creationDate: string;
}

export type AxiosContextType = {
    instance: AxiosInstance;
    getMe: () => Promise<Either<User, unknown>>;
    getNotes: () => Promise<Either<Note[], unknown>>;
    getNoteById: (id: string) => Promise<Either<Note, unknown>>;
    updateNoteById: (id: string, content: OutputData) => Promise<Either<Note, unknown>>;
    deleteNoteById: (id: string) => Promise<Either<Note, unknown>>;
    createNote: () => Promise<Either<Note, unknown>>;
}

export const AxiosContext = createNullableContext<AxiosContextType>();
