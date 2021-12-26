import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";
import { AuthContext } from "./Context/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
