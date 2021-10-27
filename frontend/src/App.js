import "./App.css";
import { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

const GET_CARDS = gql`
  query Query {
    cards {
      id
      title
      content
    }
  }
`;

const CARD_SUBSCRIPTION = gql`
  subscription Subscription {
    card {
      mutation
      data {
        id
        title
        content
      }
    }
  }
`;

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
