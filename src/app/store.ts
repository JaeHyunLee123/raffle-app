import { configureStore } from "@reduxjs/toolkit";
import RaffleReducer from "../features/raffle/raffleSlice";

export const store = configureStore({
  reducer: {
    raffles: RaffleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
