
import { useState } from "react";

import NavBar from "./NavBar.js";
import OrgDashboard from "./OrgDashboard.js";
import OrgSelect from "./OrgSelect.js";

function Dashboard({ user, setUser }) {
  const [currentPage, setCurrentPage] = useState("org-select");
  const [currentOrg, setCurrentOrg] = useState();
  const [currentProj, setCurrentProj] = useState();

  const setCurrentOrgWrap = (org) => {
    setCurrentOrg(org);
    setCurrentPage("org");
  };

  const setCurrentProjWrap = (proj) => {
    setCurrentProj(proj);
    setCurrentPage("proj");
  };

  const getPageContent = () => {
    switch (currentPage) {
      case "org-select":
        return (<OrgSelect {...{user, currentOrg, setCurrentOrg: setCurrentOrgWrap}} />);
      case "org":
        return (<OrgDashboard {...{user, org: currentOrg, setCurrentProj: setCurrentProjWrap}} />);
      default:
        return (<div> constructing </div>);
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