import { useMemo } from "react";
import { Alert, Button, Card, CardContent, CardHeader, Chip, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ReactJson from "react-json-view";
import InfoIcon from "@mui/icons-material/Info";

import StoreType from "./types/StoreType";
import { setBet, setCash } from "./config/cardsSlice";
import useGame from "./hooks/useGame";
import PlayCard from "./components/PlayCard";
import "./App.css";

function App() {
  const { startGame, stopGame, hit, stand, newBet } = useGame();
  const dispatch = useDispatch();
  const { isGameRunning, bet, cash, count, response, actions, playerHand, dealerHand } = useSelector(
    (state: StoreType) => state.cards,
  );
  const dealerCount = useMemo(() => dealerHand.reduce((acc, card) => acc + card.value, 0), [dealerHand]);

  return (
    <Stack gap="20px" sx={{ mx: { xs: 0, lg: '300px' } }}>
      <Typography variant="h4">Simple Blackjack</Typography>
      <Stack direction="row" gap="20px" className="info-row">
        <TextField
          label="Total Cash"
          variant="outlined"
          type="number"
          value={cash}
          onChange={(e) => dispatch(setCash(Number(e.target.value)))}
          disabled={isGameRunning}
        />
        <TextField
          label="Bet"
          variant="outlined"
          type="number"
          value={bet}
          onChange={(e) => dispatch(setBet(Number(e.target.value)))}
          disabled={!actions.includes("bet?value=n") && isGameRunning}
        />
      </Stack>
      <Button
        variant={isGameRunning ? "outlined" : "contained"}
        onClick={() => (isGameRunning ? stopGame() : startGame())}
      >
        {isGameRunning ? "STOP GAME" : "START GAME"}
      </Button>
      {isGameRunning && (
        <Stack gap="20px">
          <Stack gap="20px" direction="row">
            {actions.includes("bet?value=n") && (
              <Button className="action-button" variant="contained" onClick={newBet}>
                NEW BET
              </Button>
            )}
            {actions.includes("hit") && (
              <Button className="action-button" variant="contained" onClick={hit}>
                HIT
              </Button>
            )}
            {actions.includes("stand") && (
              <Button className="action-button" variant="outlined" onClick={stand}>
                STAND
              </Button>
            )}
          </Stack>
          <Alert
            icon={<InfoIcon fontSize="inherit" />}
            severity={(dealerCount > count && dealerCount < 21) || count > 21 ? "error" : "success"}
          >
            {JSON.parse(response).message}
          </Alert>

          <Stack gap="20px">
            <Stack direction="row" gap="20px">
              <Typography variant="h6">Player's Hand</Typography>
              <Chip label={`Player count: ${count}`} variant="outlined" />
            </Stack>
            <Stack direction="row" gap="10px" sx={{ flexWrap: "wrap" }}>
              {playerHand.map((card, i) => (
                <PlayCard key={i} {...card} />
              ))}
            </Stack>
          </Stack>

          <Stack className="right" gap="20px">
            <Stack direction="row" gap="20px" className="right">
              <Chip label={`Dealer count: ${dealerCount}`} variant="outlined" />
              <Typography variant="h6">Dealer's Hand</Typography>
            </Stack>
            <Stack direction="row" gap="10px" className="right" sx={{ flexWrap: "wrap" }}>
              {dealerHand.map((card, i) => (
                <PlayCard key={i} {...card} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
      <Card variant="outlined" className="json-card">
        <CardHeader subheader="API Response" />
        <CardContent className="json-card-content">
          <ReactJson style={{ padding: "20px" }} theme="google" name={false} src={JSON.parse(response)} />
        </CardContent>
      </Card>
    </Stack>
  );
}

export default App;
