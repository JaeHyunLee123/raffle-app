import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { RenderHookOptions } from "@testing-library/react";

interface RaffleObj {
  ticket: number;
  name: string;
  id: number;
}

interface RaffleState {
  list: RaffleObj[];
}

const initialState: RaffleState = {
  list: [],
};

export const raffleSlice = createSlice({
  name: "raffles",
  initialState,
  reducers: {},
});

export const {} = raffleSlice.actions;

export const selectRaffle = (state: RootState) => state.raffles.list;

export default raffleSlice.reducer;
