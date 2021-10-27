import logo from "./logo.svg";
import "./App.css";

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

function App() {
  const { loading, error, data } = useQuery(GET_CARDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
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
