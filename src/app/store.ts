import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import allUserReducer from '../features/user/allUsersSlice';
import userAuthReducer from '../features/auth/authSlice';
import allTasksReducer from '../features/user/allTasksSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const currentUserReducer = persistReducer(persistConfig, userReducer)
const usersReducer = persistReducer(persistConfig, allUserReducer)
const authReducer = persistReducer(persistConfig, userAuthReducer)
const tasksReducer = persistReducer(persistConfig, allTasksReducer)

export const store = configureStore({
  reducer: {
    user: currentUserReducer,
    allUsers: usersReducer,
    auth: authReducer,
    allTasks:tasksReducer
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store)