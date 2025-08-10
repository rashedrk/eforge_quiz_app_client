import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    role?: string;
};

export type AuthState = {
    accessToken: string | null;
    user: AuthUser | null;
};

const initialState: AuthState = {
    accessToken: null,
    user: null,
};

type SetCredentialsPayload = {
    accessToken: string;
    user?: AuthUser | null;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user ?? state.user;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

// selectors
export const useCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

