import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsApi } from '@services/post.service';
import { housesApi } from '@services/house.service';
import { usersApi } from '@services/user.service';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [housesApi.reducerPath]: housesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, housesApi.middleware, usersApi.middleware),
});
