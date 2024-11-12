import { CardType } from "./CardType";

export type ResponseType = {
  message: string;
  cash: number;
  bet: number;
  count: number;
  card: CardType;
  hand: CardType[];
  dealerHand: CardType[];
  actions: string[];
};
