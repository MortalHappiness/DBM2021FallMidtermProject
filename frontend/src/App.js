import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./Auth";
import IndexPage from "./containers/IndexPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import DashboardPage from "./containers/DashboardPage";
import NotFoundPage from "./containers/NotFoundPage";
import OrganizationPage from "./containers/OrganizationPage";
import ProjectPage from "./containers/ProjectPage";
import NavBar from "./containers/NavBar";
import Loading from "./components/Loading";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/organization/:id"
            element={
              <RequireAuth>
                <OrganizationPage />
              </RequireAuth>
            }
          />
          <Route
            path="/project/:id"
            element={
              <RequireAuth>
                <ProjectPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.loading) return <Loading />;

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
