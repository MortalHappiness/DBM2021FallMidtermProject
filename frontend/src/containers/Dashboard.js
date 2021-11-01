
import { useState } from "react";

import CardCreationForm from "./CardCreationForm.js";
import CardList from "./CardList.js";
import CardUpdateForm from "./CardUpdateForm.js";
import NavBar from "./NavBar.js";
import OrgSelect from "./OrgSelect.js";

function Dashboard({ user, setUser }) {
  const [currentPage, setCurrentPage] = useState("org");
  const [currentOrg, setCurrentOrg] = useState();

  const setCurrentOrgWrap = (org) => {
    setCurrentOrg(org);
    setCurrentPage("proj");
  };

  const getPageContent = () => {
    switch (currentPage) {
      case "org":
        return (<OrgSelect {...{user, currentOrg, setCurrentOrg: setCurrentOrgWrap}} />);
      case "proj":
        return (<div>constructing</div>)
      default:
        break;
    }
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      { getPageContent() }
      {/* <CardList />
      <CardCreationForm />
      <CardUpdateForm /> */}
    </div>
  )
}

export default Dashboard;