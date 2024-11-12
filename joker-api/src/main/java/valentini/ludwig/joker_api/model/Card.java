package valentini.ludwig.joker_api.model;

import lombok.Getter;
import lombok.Setter;
import valentini.ludwig.joker_api.enums.SuitEnum;

import java.util.UUID;

@Getter
@Setter
public class Card {
    private UUID id;
    private int value;
    private int displayValue;
    private SuitEnum suit;

    public Card(int value, int displayValue, SuitEnum suit) {
        this.id = UUID.randomUUID();
        this.displayValue = displayValue;
        this.value = value;
        this.suit = suit;
    }

    public String getHeadSymbol() {
        return switch (displayValue) {
            case 1, 14 -> "A";
            case 11 -> "J";
            case 12 -> "Q";
            case 13 -> "K";
            default -> Integer.toString(displayValue);
        };
    }

    @SuppressWarnings("unused")
    public String getSuitSymbol() {
        return switch (suit) {
            case CLUBS -> "♣";
            case DIAMONDS -> "♦";
            case HEARTS -> "♥";
            case SPADES -> "♠";
        };
    }
}
