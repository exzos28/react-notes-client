import {useForcedContext} from "../context";
import {AxiosContext} from "./AxiosContext";

export const useAxios = () => useForcedContext(AxiosContext);
