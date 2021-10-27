import "./App.css";
import { useEffect } from "react";

import { useQuery } from "@apollo/client";

import { GET_CARDS, CARD_SUBSCRIPTION } from "./graphql";

function App() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_CARDS);
  useEffect(() => {
    try {
      subscribeToMore({
        document: CARD_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newCard = subscriptionData.data;
          return { ...prev, cards: [...prev.cards, newCard.card.data] };
        },
      });
    } catch (e) {}
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      {data.cards.map((card) => (
        <ul key={card.id}>
          <li>{`Title: ${card.title}`}</li>
          <li>{`Content: ${card.content}`}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
