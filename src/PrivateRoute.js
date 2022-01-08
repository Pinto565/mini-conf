import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AuthContext } from "./Context/AuthContext";

export default function HomeRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [isuser, setUser] = useState(null);
  const { loggedUser, setLoggedUser } = useContext(AuthContext);


  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center px-3"
          style={{ height: "100vh", width: "100vw" }}
        >
          <LinearProgress />
        </div>
      ) : isuser ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
