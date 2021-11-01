
import CardList from "./CardList.js";
import CardCreationForm from "./CardCreationForm.js";
import CardUpdateForm from "./CardUpdateForm.js";

function ProjDashboard({ user, org, proj }) {
  return (
    <div>
      <CardList />
      <CardCreationForm />
      <CardUpdateForm /> 
    </div>
  );
}

export default ProjDashboard;