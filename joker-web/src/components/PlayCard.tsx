import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import { CardType } from "./types/CardType";
import "./PlayCard.css";

const PlayCard = (card: CardType) => {
  return (
    <Card className="play-card">
      <Stack className="play-card-content">
        <Typography sx={{ alignSelf: 'start' }} variant="h4">{card.suitSymbol}</Typography>
        <Typography sx={{ alignSelf: 'center' }} variant="h4">{card.headSymbol}</Typography>
        <Typography sx={{ alignSelf: 'self-end' }} variant="h4">{card.suitSymbol}</Typography>
      </Stack>
    </Card>
  );
};

export default PlayCard;
