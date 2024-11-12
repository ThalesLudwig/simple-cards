import axios from "axios";
import { HOST_URL } from "../constants/hostUrl";
import StoreType from "../types/StoreType";
import { useDispatch, useSelector } from "react-redux";
import {
  setActions,
  setCash,
  setCount,
  setDealerHand,
  setIsLoading,
  setPlayerHand,
  setResponse,
  startGame as startState,
  stopGame as stopState,
} from "../config/cardsSlice";
import { ResponseType } from "../types/ResponseType";

const useGame = () => {
  const { bet, cash } = useSelector((state: StoreType) => state.cards);
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setIsLoading(true));
    dispatch(startState());
    axios
      .get<ResponseType>(`${HOST_URL}/start?cash=${cash ?? 0}&bet=${bet ?? 0}`)
      .then((response) => {
        dispatch(setResponse(response.data));
        dispatch(setPlayerHand(response.data.hand));
        dispatch(setDealerHand(response.data.dealerHand));
        dispatch(setCount(response.data.count));
        dispatch(setCash(response.data.cash));
        dispatch(setActions(response.data.actions));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setResponse(error));
        dispatch(setIsLoading(false));
      });
  };

  const stopGame = () => {
    dispatch(stopState());
    dispatch(setIsLoading(true));
    axios
      .get<ResponseType>(`${HOST_URL}/stop`)
      .then(() => {
        dispatch(setResponse({}));
        dispatch(setPlayerHand([]));
        dispatch(setDealerHand([]));
        dispatch(setIsLoading(false));
        dispatch(setCount(0));
        dispatch(setCash(1000));
      })
      .catch((error) => {
        dispatch(setResponse(error));
        dispatch(setIsLoading(false));
      });
  };

  const hit = () => {
    dispatch(setIsLoading(true));
    axios
      .get<ResponseType>(`${HOST_URL}/hit`)
      .then((response) => {
        dispatch(setResponse(response.data));
        dispatch(setPlayerHand(response.data.hand));
        dispatch(setDealerHand(response.data.dealerHand));
        dispatch(setCount(response.data.count));
        dispatch(setCash(response.data.cash));
        dispatch(setActions(response.data.actions));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setResponse(error));
        dispatch(setIsLoading(false));
      });
  };

  const stand = () => {
    dispatch(setIsLoading(true));
    axios
      .get<ResponseType>(`${HOST_URL}/stand`)
      .then((response) => {
        dispatch(setResponse(response.data));
        dispatch(setPlayerHand(response.data.hand));
        dispatch(setDealerHand(response.data.dealerHand));
        dispatch(setCount(response.data.count));
        dispatch(setCash(response.data.cash));
        dispatch(setActions(response.data.actions));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setResponse(error));
        dispatch(setIsLoading(false));
      });
  };

  const newBet = () => {
    dispatch(setIsLoading(true));
    axios
      .get<ResponseType>(`${HOST_URL}/bet?value=${bet ?? 0}`)
      .then((response) => {
        dispatch(setResponse(response.data));
        dispatch(setPlayerHand(response.data.hand));
        dispatch(setDealerHand(response.data.dealerHand));
        dispatch(setCount(response.data.count));
        dispatch(setCash(response.data.cash));
        dispatch(setActions(response.data.actions));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setResponse(error));
        dispatch(setIsLoading(false));
      });
  };

  return {
    startGame,
    stopGame,
    hit,
    stand,
    newBet,
  };
};

export default useGame;
