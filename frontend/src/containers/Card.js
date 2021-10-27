import { useCallback } from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Card({ data, deleteCard }) {
  const handleClick = useCallback(() => {
    deleteCard({ variables: { id: data.id } });
  }, [deleteCard, data.id]);

  return (
    <MuiCard variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {`Title: ${data.title}`}
        </Typography>
        <Typography variant="body2">{`Id: ${data.id}`}</Typography>
        <Typography variant="body2">{`Content: ${data.content}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Delete
        </Button>
      </CardActions>
    </MuiCard>
  );
}