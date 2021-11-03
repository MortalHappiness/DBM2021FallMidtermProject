
import Card from "./Card.js";
import CardList from "./CardList.js";
import CardCreationForm from "./CardCreationForm.js";
// import CardUpdateForm from "./CardUpdateForm.js";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useState } from "react";

function ProjDashboard({ user, org, proj }) {

  // TODO: fetch cards in this proj
  // TODO: add label related things

  const [showCardList, setShowCardList] = useState(true);
  const [viewCardId, setViewCardId] = useState(0);

  const viewCard = (cardId) => {
    console.log('view card', cardId);
    setViewCardId(cardId);
    setShowCardList(false);
  };

  const getCardViewContent = () => {
    if (showCardList) {
      return (
        <Box>
          <Box m={2}>
            <CardCreationForm />
          </Box>
          {/* <CardUpdateForm />  */}
          <Box>
            <CardList viewCard={viewCard} />
          </Box>
        </Box>
      );
    } else {
      console.log(viewCardId);
      return (
        <Card {...{ 
          exit: () => setShowCardList(true),
          cardId: viewCardId,
        }} />
      );
    }
  }

  return (
    <div>
      <Container>
        <Box m={2}>
          <div>
            <h1> {proj.name} </h1>
          </div>
        </Box>
        {getCardViewContent()}
      </Container>
    </div>
  );
}

export default ProjDashboard;