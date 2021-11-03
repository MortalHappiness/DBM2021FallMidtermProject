
import CardList from "./CardList.js";
import CardCreationForm from "./CardCreationForm.js";
import CardUpdateForm from "./CardUpdateForm.js";

function ProjDashboard({ user, org, proj }) {

  // TODO: fetch cards in this proj
  // TODO: add label related things

  return (
    <div>
      <CardList />
      <CardCreationForm />
      <CardUpdateForm /> 
    </div>
  );
}

export default ProjDashboard;