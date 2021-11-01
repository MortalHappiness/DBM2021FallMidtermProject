
import CardCreationForm from "./CardCreationForm.js";
import CardList from "./CardList.js";
import CardUpdateForm from "./CardUpdateForm.js";

function Dashboard({ user, setUser }) {
  return (
    <div>
      <CardList />
      <CardCreationForm />
      <CardUpdateForm />
    </div>
  )
}

export default Dashboard;