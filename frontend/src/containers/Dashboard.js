
import CardCreationForm from "./CardCreationForm.js";
import CardList from "./CardList.js";
import CardUpdateForm from "./CardUpdateForm.js";
import NavBar from "./NavBar.js";

function Dashboard({ user, setUser }) {
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <CardList />
      <CardCreationForm />
      <CardUpdateForm />
    </div>
  )
}

export default Dashboard;