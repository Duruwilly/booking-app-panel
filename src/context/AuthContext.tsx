import { createContext, useContext, useEffect, useReducer, useState } from "react";

type StateType = {
    user: any;
    loading: any;
    error: any;
};

type Action =
    | { type: "START" }
    | { type: "SUCCESS"; payload: any }
    | { type: "FAILED"; payload: any }
    | { type: "LOGOUT" };

const user = JSON.parse(localStorage.getItem("user")!);

const INITIAL_STATE: StateType = {
    user: user ? user : null,
    loading: false,
    error: null,
};

type AuthReturnType = {
    dispatch: React.Dispatch<Action>;
    user: StateType['user'];
    loading: StateType['loading'];
    error: StateType['error'];
};


const AuthContext = createContext<AuthReturnType | null>(null);

const AuthReducer = (state: StateType, action: Action) => {
    switch (action.type) {
        case "START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "FAILED":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext) as AuthReturnType;
