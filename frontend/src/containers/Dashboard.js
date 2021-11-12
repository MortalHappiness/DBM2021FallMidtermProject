
import { Container } from "@mui/material";
import { useState } from "react";

import NavBar from "./NavBar.js";
import OrgDashboard from "./OrgDashboard.js";
import OrgSelect from "./OrgSelect.js";
import ProjDashboard from "./ProjDashboard.js";

function Dashboard({ username, userId, logout }) {
  console.log('dashboard user', username, userId)
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
        return (
          <OrgSelect {...{
            username,
            userId,
            currentOrg,
            setCurrentOrg: setCurrentOrgWrap
          }} />
        );
      case "org":
        return (
          <OrgDashboard {...{
            username,
            userId,
            org: currentOrg,
            setCurrentProj: setCurrentProjWrap,
            exit: () => setCurrentPage("org-select"),
          }} />
        );
      case "proj":
        return (
          <ProjDashboard {...{
            username,
            userId,
            org: currentOrg,
            proj: currentProj,
            exit: () => setCurrentPage("org"),
          }} />
        );
      default:
        return (<div> constructing </div>);
    }
  };

  return (
    <div>
      <NavBar user={username} logout={logout} />
      <Container>
        {getPageContent()}
      </Container>
    </div>
  )
}

export default Dashboard;