package valentini.ludwig.joker_api.dto;

import lombok.Getter;
import lombok.Setter;
import valentini.ludwig.joker_api.model.Card;

import java.util.ArrayList;

@Getter
@Setter
public class GameResponse {
    private String message;
    private double cash;
    private double bet;
    private int count;
    private Card card;
    private ArrayList<Card> hand;
    private ArrayList<Card> dealerHand;
    private String[] actions;

    public GameResponse(String message, double cash, double bet, int count, Card card, ArrayList<Card> hand, ArrayList<Card> dealerHand, String[] actions) {
        this.message = message;
        this.cash = cash;
        this.bet = bet;
        this.count = count;
        this.card = card;
        this.hand = hand;
        this.actions = actions;
        this.dealerHand = dealerHand;
    }

    public GameResponse(String message, double cash, double bet, int count, ArrayList<Card> hand, String[] actions) {
        this(message, cash, bet, count, null, hand, null, actions);
    }

    public GameResponse(String message, double cash, double bet, int count, ArrayList<Card> hand, ArrayList<Card> dealerHand, String[] actions) {
        this(message, cash, bet, count, null, hand, dealerHand, actions);
    }
}
