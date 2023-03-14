import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    let location = useLocation();
    if (!currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    //An <Outlet> should be used in parent route elements to render their child route elements.
    // This allows nested UI to show up when child routes are rendered. If the parent route
    // matched exactly, it will render a child index route or nothing if there is no index route.
    return <Outlet />;
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouter />}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
        {/* <Route path="/details/:id" element={<MovieDetail />} /> */}
        {/* <Route
          path="/details/:id"
          element={currentUser ? <MovieDetail /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
