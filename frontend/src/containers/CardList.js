import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_CARDS, CARD_SUBSCRIPTION } from "../graphql";
import Card from "../components/Card";

export default function CardList() {
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
    <div>
      {data.cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
}
