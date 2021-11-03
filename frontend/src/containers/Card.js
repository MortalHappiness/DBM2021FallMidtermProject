
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function Card({ exit, cardId }) {
  return (
    <Box>
      <Box>
        <Button size="small" onClick={exit}>
          Return to card list
        </Button>
      </Box>
      checking card {cardId}
    </Box>
  );
}

export default Card;