import {useForcedContext} from "../context";
import {AuthContext} from "./AuthContext";

export const useAuth = () => useForcedContext(AuthContext);
