package valentini.ludwig.joker_api.service;

import lombok.Getter;
import valentini.ludwig.joker_api.dto.GameResponse;
import valentini.ludwig.joker_api.model.Card;
import valentini.ludwig.joker_api.model.Deck;

import java.util.ArrayList;

public class BlackjackService {
    @Getter private static Deck deck;
    @Getter private static double cash;
    @Getter private static double bet;
    private static ArrayList<Card> playerHand;
    private static ArrayList<Card> dealerHand;

    public static ArrayList<Card> getHand(ArrayList<Card> hand) {
        int handCount = hand.stream()
            .filter(card -> card.getDisplayValue() != 1)
            .mapToInt(Card::getValue)
            .sum();
        for (Card card : hand) {
            if (card.getHeadSymbol().equals("A")) card.setValue(handCount > 10 ? 1 : 11);
        }
        return hand;
    }

    public static ArrayList<Card> getPlayerHand() {
        return getHand(playerHand);
    }

    private static void setGame(double startingCash, double startingBet) {
        deck = new Deck();
        playerHand = new ArrayList<>();
        playerHand.add(deck.getRandomCard());
        playerHand.add(deck.getRandomCard());
        dealerHand = new ArrayList<>();
        dealerHand.add(deck.getRandomCard());
        dealerHand.add(deck.getRandomCard());
        cash = startingCash - startingBet;
        bet = startingBet;
        // never start a game if dealer starts with 21
        if (countCards(getHand(dealerHand)) == 21) setGame(startingCash, startingBet);
    }

    private static int countCards(ArrayList<Card> cards) {
        return cards.stream()
                .mapToInt(Card::getValue)
                .sum();
    }

    private static ArrayList<Card> getHiddenDealerHand() {
        return new ArrayList<>(getHand(dealerHand).subList(0, 1));
    }

    public static GameResponse setBet(double value) {
        String[] commands = new String[]{ "start" };
        if (deck == null) return new GameResponse("Game is not running.", 0, bet, 0, null, commands);
        if (bet > 0) return new GameResponse("You can't bet now.", cash, bet, countCards(getHand(playerHand)), getHand(playerHand), new String[]{ "hit", "stand", "cash", "hand", "stop" });
        if (value > cash) {
            commands = new String[]{ "bet?value=n", "cash", "stop" };
            return new GameResponse("Bet is bigger than cash.", cash, bet, 0, new ArrayList<>(), commands);
        }
        else if (countCards(getHand(playerHand)) == 21) {
            return win("Natural 21 - You win", 1.5 * bet);
        }
        else {
            commands = new String[]{ "hit", "stand", "cash", "hand", "stop" };
            bet = value;
            cash = cash - bet;
            return new GameResponse("Bet is set: $ " + bet, cash, bet, countCards(getHand(playerHand)), getHand(playerHand), getHiddenDealerHand(), commands);
        }
    }

    private static GameResponse win(String message, double cashEarned) {
        String[] commands = new String[]{ "bet?value=n", "cash", "stop" };
        double newCashAmount = cash + cashEarned;
        GameResponse response = new GameResponse(message, newCashAmount, 0, countCards(getHand(playerHand)), getHand(playerHand), getHand(dealerHand), commands);
        setGame(newCashAmount, 0);
        return response;
    }

    private static GameResponse lose(String message) {
        String[] commands = new String[]{ "bet?value=n", "cash", "stop" };
        GameResponse response = new GameResponse(message, cash, 0, countCards(getHand(playerHand)), getHand(playerHand), getHand(dealerHand), commands);
        setGame(cash, 0);
        return response;
    }

    public static GameResponse stand() {
        String[] commands = new String[]{ "bet?value=n", "cash", "stop" };
        if (bet == 0) return new GameResponse("No bet is set.", cash, bet, 0, new ArrayList<>(), commands);
        int playerScore = countCards(getHand(playerHand));
        int dealerScore = countCards(getHand(dealerHand));
        while (dealerScore < 17) {
            dealerHand.add(deck.getRandomCard());
            dealerScore = countCards(getHand(dealerHand));
        }
        if (dealerScore > 21) {
            return win("Dealer busted: " + dealerScore + ". You win.", bet * 2);
        }
        if (playerScore > dealerScore) {
            return win("Player: " + playerScore + ", Dealer: " + dealerScore + ": You win.", bet * 2);
        }
        if (playerScore == dealerScore) {
            return win("Player: " + playerScore + ", Dealer: " + dealerScore + ": Tie.", bet);
        }
        else {
            return lose("Player: " + playerScore + ", Dealer: " + dealerScore + ": You lose.");
        }
    }

    public static GameResponse hit() {
        String[] commands = new String[]{ "bet?value=n", "cash", "stop" };
        if (bet == 0) return new GameResponse("No bet is set.", cash, bet, 0, new ArrayList<>(), commands);
        Card randomCard = deck.getRandomCard();
        playerHand.add(randomCard);
        commands = new String[]{ "hit", "stand", "cash", "hand", "stop" };
        boolean isBust = countCards(getHand(playerHand)) > 21;
        GameResponse response = new GameResponse(Integer.toString(countCards(getHand(playerHand))), cash, bet, countCards(getHand(playerHand)), randomCard, getHand(playerHand), getHiddenDealerHand(), commands);
        if (isBust) {
            var bustedResponse = lose("Busted");
            response.setActions(bustedResponse.getActions());
            response.setMessage("Busted");
            response.setDealerHand(getHand(dealerHand));
        } else if (countCards(getHand(playerHand)) == 21) {
            var wonResponse = win("21 - You win", 2 * bet);
            response.setActions(wonResponse.getActions());
            response.setMessage(wonResponse.getMessage());
            response.setDealerHand(getHand(dealerHand));
        }
        return response;
    }

    public static GameResponse start(double cash, double bet) {
        String[] commands = new String[]{ "hit", "stand", "cash", "hand", "stop" };
        if (deck != null) {
            commands = new String[]{ "start" };
            return new GameResponse("Game is already running.", cash, bet, countCards(getHand(playerHand)), getHand(playerHand), getHiddenDealerHand(), commands);
        }
        if (bet <= 0 || bet > cash) {
            commands = new String[]{ "start" };
            return new GameResponse("Bet is invalid.", cash, bet, 0, getHand(playerHand), getHiddenDealerHand(), commands);
        }
        setGame(cash, bet);
        if (countCards(getHand(playerHand)) == 21) {
            return win("Natural 21 - You win", 1.5 * bet);
        }
        return new GameResponse("Game started", cash, bet, countCards(getHand(playerHand)), getHand(playerHand), getHiddenDealerHand(), commands);
    }

    public static GameResponse stop() {
        String[] commands = new String[]{ "start" };
        if (deck == null) return new GameResponse("Game is not running.", 0, bet, 0, null, commands);
        deck = null;
        cash = 0;
        return new GameResponse("Game stopped.", cash, bet, 0, null, commands);
    }
}
