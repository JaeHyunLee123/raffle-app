import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "src/app/store";

export interface RaffleObj {
  ticket: number;
  name: string;
  id: number;
}

interface RaffleState {
  list: RaffleObj[];
}

const localRafflesString = localStorage.getItem("raffles");

const initialState: RaffleState = localRafflesString
  ? JSON.parse(localRafflesString)
  : {
      list: [],
    };

export const raffleSlice = createSlice({
  name: "raffles",
  initialState,
  reducers: {
    createRaffle: (state, action: PayloadAction<string>) => {
      const newRaffle: RaffleObj = {
        name: action.payload,
        id: Date.now(),
        ticket: 1,
      };

      state.list = [...state.list, newRaffle];

      localStorage.setItem("raffles", JSON.stringify(state.list));
    },

    updateByAmount: (
      state,
      action: PayloadAction<{ amount: number; id: number }>
    ) => {
      state.list.forEach((raffle) => {
        if (raffle.id === action.payload.id) {
          raffle.ticket = Math.max(raffle.ticket + action.payload.amount, 0);
        }
      });

      localStorage.setItem("raffles", JSON.stringify(state.list));
    },

    deleteRaffle: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((raffle) => raffle.id !== action.payload);

      localStorage.setItem("raffles", JSON.stringify(state.list));
    },
  },
});

export const { createRaffle, updateByAmount, deleteRaffle } =
  raffleSlice.actions;

export const selectRaffle = (state: RootState) => state.raffles.list;

export default raffleSlice.reducer;
