import {createContext} from 'react';

// eslint-disable-next-line
export default <T extends any>() => createContext<T | undefined>(undefined);
