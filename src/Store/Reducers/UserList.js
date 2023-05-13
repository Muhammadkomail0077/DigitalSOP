import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
  userList: {},
  error: '',
  status: '',
};


const AuthReducer = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    userListFromAsyncStorage: (state, action) => {
      state.userList = action.payload;
      state.error = 'None';
      state.status = 'ok';
    },
    removeUserListFromAsyncStorage: (state, action) => {
      state.userList = {};
    },
  },
});

export default AuthReducer.reducer;
export const {userListFromAsyncStorage, removeUserListFromAsyncStorage} =
  AuthReducer.actions;
