# Simple Cards
- Simple Cards is a concept project made for studying purposes only.
- Can be played entirely through REST.
- Currently only supports Blackjack.

## Rules
- The player must score higher than the dealer without going over 21 ("busting").
- Each player is dealt two cards, and the dealer also gets two cards, with one card face up and one face down.
- Players can choose to "hit" (take another card) or "stand" (keep their current hand).
- Face cards (Kings, Queens, and Jacks) are worth 10 points, Aces can be worth 1 or 11 points, and all other cards are worth their face value.
- If a player's hand exceeds 21 points, they bust and lose the game.
- The dealer must hit until their cards total 17 or higher.
- The player wins if their hand is closer to 21 than the dealer's hand without busting.
- If both the player and dealer have the same total, it is a push (tie), and the player's bet is returned.
- No "double" or "split" moves allowed here, to keep it simple.

## Joker API
- An API for playing card games through a REST interface.
- Currently supports only simple Blackjack.
- Exposes the port 8080.

## Joker Web
- Barebones frontend built only for presentation.
- Exposes the port 5173.

### Running
- `docker compose up`
- Open the interface on http://localhost:5173/

### Endpoints
- Base endpoint: `/blackjack`
- Start game: `/start?cash=0000&bet=0000`
  - Where `cash` is the initial money amount and bet is the initial bet.
- Each endpoint returns a `commands` array with the following available commands.
  - Each command represents an endpoint, e.g.: command `hit` represents the endpoing `/blackjack/hit`
