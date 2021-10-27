import CardList from "./containers/CardList";
import CardCreationForm from "./containers/CardCreationForm";
import CardUpdateForm from "./containers/CardUpdateForm";

function App() {
  return (
    <div>
      <CardList />
      <CardCreationForm />
      <CardUpdateForm />
    </div>
  );
}

export default App;
