import {createContext, useContext} from 'react';

export const ShowErrorsContext = createContext(true);

export const useShowErrors = () => useContext(ShowErrorsContext);
