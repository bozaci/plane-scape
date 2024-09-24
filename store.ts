import { configureStore } from '@reduxjs/toolkit';
import flightsSlice from '@/slices/flightsSlice';

export const store = configureStore({
  reducer: {
    flights: flightsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
