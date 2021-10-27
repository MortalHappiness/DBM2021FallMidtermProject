import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import update from "immutability-helper";

import {
  GET_CARDS_QUERY,
  DELETE_CARD_MUTATION,
  CARD_SUBSCRIPTION,
} from "../graphql";
import Loading from "../components/Loading";
import Card from "./Card";

export default function CardList() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_CARDS_QUERY);
  const [deleteCard] = useMutation(DELETE_CARD_MUTATION);

  useEffect(() => {
    try {
      subscribeToMore({
        document: CARD_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newCard = subscriptionData.data.card;
          if (newCard.mutation === "CREATED") {
            return update(prev, { cards: { $push: [newCard.data] } });
          } else if (newCard.mutation === "UPDATED") {
            const idx = prev.cards.findIndex(
              (card) => card.id === newCard.data.id
            );
            return update(prev, { cards: { [idx]: { $merge: newCard.data } } });
          } else {
            // DELETED
            const idx = prev.cards.findIndex(
              (card) => card.id === newCard.data.id
            );
            return update(prev, { cards: { $splice: [[idx, 1]] } });
          }
        },
      });
    } catch (e) {}
  }, [subscribeToMore]);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.cards.map((card) => (
        <Card key={card.id} data={card} deleteCard={deleteCard} />
      ))}
    </div>
  );
}
