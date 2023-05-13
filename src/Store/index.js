import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/AuthReducer';
import UserList from './Reducers/UserList';

export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    userList: UserList,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
