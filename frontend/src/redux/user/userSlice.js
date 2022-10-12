import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
  userId: null,
  username: null,
  accountType: null,
  access_token: null,
  refresh_token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      const decoded = jwt_decode(action.payload.refresh_token);
      state.userId = decoded.id;
      state.username = decoded.username;
      state.accountType = decoded.accountType;
    },
    clearTokens: () => initialState,
  },
});

export const { setTokens, clearTokens } = userSlice.actions;

export default userSlice.reducer;
