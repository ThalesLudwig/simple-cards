package valentini.ludwig.joker_api.model;

import lombok.Getter;
import lombok.Setter;
import valentini.ludwig.joker_api.enums.SuitEnum;

import java.util.ArrayList;
import java.util.Random;

@Setter
@Getter
public class Deck {
    private ArrayList<Card> cards = new ArrayList<>();

    public Deck() {
        this.startDeck();
    }

    private void startDeck() {
        for (int i = 1; i <= 13; i++) {
            cards.add(new Card(Math.min(i, 10), i, SuitEnum.CLUBS));
            cards.add(new Card(Math.min(i, 10), i, SuitEnum.SPADES));
            cards.add(new Card(Math.min(i, 10), i, SuitEnum.HEARTS));
            cards.add(new Card(Math.min(i, 10), i, SuitEnum.DIAMONDS));
        }
    }

    public Card getRandomCard() {
        int randomIndex = new Random().nextInt(cards.size());
        Card pulledCard = cards.get(randomIndex);
        cards.removeIf(card -> card.getId().equals(pulledCard.getId()));
        return pulledCard;
    }
}
