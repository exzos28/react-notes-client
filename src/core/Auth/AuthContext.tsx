import {createNullableContext} from "../context";
import {User} from "../Axios/AxiosContext";


export type AuthContextType = {
    user: User | undefined;
    loading: boolean;
    initialized: boolean;
    login: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createNullableContext<AuthContextType>();
