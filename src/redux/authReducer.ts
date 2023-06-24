import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userDataType = {
  id: number | null;
  email: string | null;
  fullname: string | null;
  role: string | null;
  country: string | null;
  mobileNumber: string | null;
  isAdmin: boolean | null;
  auth_token: string | null;
};

interface AuthInitialStateInterface {
  authenticated: boolean;
}

const initialState: AuthInitialStateInterface & userDataType = {
  id: null,
  email: null,
  fullname: null,
  country: null,
  authenticated: false,
  role: null,
  mobileNumber: null,
  isAdmin: null,
  auth_token: null,
};

const AuthReducer = createSlice({
  name: "auth-reducer",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<userDataType>) => {
      state = { ...state, ...action.payload, authenticated: true };
      return state;
    },

    logoutAction: (state) => {
      state = { ...state, ...initialState };
      return state;
    },
  },
});

export const { loginAction, logoutAction } = AuthReducer.actions;
export default AuthReducer.reducer;
