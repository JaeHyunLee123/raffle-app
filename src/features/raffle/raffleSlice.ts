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

const updateLocalStorage = (state: RaffleState) => {
  localStorage.setItem("raffles", JSON.stringify(state.list));
};

const localRafflesString = localStorage.getItem("raffles");

const initialState: RaffleState = localRafflesString
  ? {
      list: JSON.parse(localRafflesString),
    }
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

      updateLocalStorage(state);
    },

    updateByAmount: (
      state,
      action: PayloadAction<{ amount: number; id: number }>
    ) => {
      state.list.forEach((raffle) => {
        if (raffle.id === action.payload.id) {
          raffle.ticket = Math.max(action.payload.amount, 0);
        }
      });

      updateLocalStorage(state);
    },

    deleteRaffle: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((raffle) => raffle.id !== action.payload);

      updateLocalStorage(state);
    },

    increasement: (state, action: PayloadAction<number>) => {
      state.list.forEach((raffle) => {
        if (raffle.id === action.payload) {
          raffle.ticket += 1;
        }
      });

      updateLocalStorage(state);
    },

    decreasement: (state, action: PayloadAction<number>) => {
      state.list.forEach((raffle) => {
        if (raffle.id === action.payload && raffle.ticket > 0) {
          raffle.ticket -= 1;
        }
      });

      updateLocalStorage(state);
    },

    deleteAll: (state) => {
      state.list = [];
      updateLocalStorage(state);
    },
  },
});

export const {
  createRaffle,
  updateByAmount,
  deleteRaffle,
  increasement,
  decreasement,
  deleteAll,
} = raffleSlice.actions;

export const selectRaffle = (state: RootState) => state.raffles.list;

export const selectTotalTickets = (state: RootState) => {
  let totalTickets = 0;
  state.raffles.list.forEach((raffle) => {
    totalTickets += raffle.ticket;
  });

  return totalTickets;
};

export default raffleSlice.reducer;
