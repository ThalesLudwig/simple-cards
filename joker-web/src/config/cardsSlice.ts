import { createSlice } from "@reduxjs/toolkit";
import { CardType } from "../types/CardType";

export type CardsProps = {
  playerHand: CardType[];
  dealerHand: CardType[];
  isGameRunning: boolean;
  isLoading: boolean;
  cash: number;
  bet: number;
  count: number;
  response: string;
  actions: string[];
};

const initialState: CardsProps = {
  isGameRunning: false,
  isLoading: false,
  dealerHand: [],
  playerHand: [],
  cash: 1000,
  bet: 100,
  count: 0,
  response: '{}',
  actions: [],
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    startGame(state: CardsProps) {
      state.isGameRunning = true;
    },
    stopGame(state: CardsProps) {
      state.isGameRunning = false;
    },
    setPlayerHand(state: CardsProps, action) {
      state.playerHand = action.payload;
    },
    setDealerHand(state: CardsProps, action) {
      state.dealerHand = action.payload;
    },
    setCash(state: CardsProps, action) {
      state.cash = action.payload;
    },
    setBet(state: CardsProps, action) {
      state.bet = action.payload;
    },
    setIsLoading(state: CardsProps, action) {
      state.isLoading = action.payload;
    },
    setResponse(state: CardsProps, action) {
      state.response = JSON.stringify(action.payload);
    },
    setCount(state: CardsProps, action) {
      state.count = action.payload;
    },
    setActions(state: CardsProps, action) {
      state.actions = action.payload;
    },
  },
});

export const {
  setDealerHand,
  setPlayerHand,
  startGame,
  stopGame,
  setCash,
  setBet,
  setIsLoading,
  setResponse,
  setCount,
  setActions,
} = themeSlice.actions;

export default themeSlice.reducer;
