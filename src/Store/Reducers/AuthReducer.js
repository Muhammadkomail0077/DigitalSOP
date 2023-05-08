import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
  userData: {},
  error: '',
  status: '',
};


const AuthReducer = createSlice({
  name: 'authReducer',
  // initialState,
  initialState,
  reducers: {
    userDataFromAsyncStorage: (state, action) => {
      state.userData = action.payload;
      state.error = 'None';
      state.status = 'ok';
    },
    removeUserDataFromAsyncStorage: (state, action) => {
      state.userData = {};
    },
  },
//   extraReducers: {
//     [UserSignup.pending]: (state, action) => {
//       state.status = 'Pending';
//     },
//     [UserSignup.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//     [UserSignup.fulfilled]: (state, action) => {
//       if (action.payload) {
//         state.userData.push(action.payload);
//         state.status = 'Ok';
//         state.error = 'none';
//       }
//     },
//     [UserLogin.pending]: (state, action) => {
//       state.status = 'Pending';
//     },
//     [UserLogin.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//     [UserLogin.fulfilled]: (state, action) => {
//       if (action.payload) {
//         state.userData.push(action.payload);
//         state.status = 'Ok';
//         state.error = 'none';
//       }
//     },
//   },
});

export default AuthReducer.reducer;
export const {userDataFromAsyncStorage, removeUserDataFromAsyncStorage} =
  AuthReducer.actions;
