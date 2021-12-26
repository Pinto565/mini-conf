import firebase from "firebase/app";
import "firebase/auth";
import "../firebase";
import Button from "@material-ui/core/Button";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FadeIn from "../animations/FadeIn";
import Particles from "../animations/Particles";
import { checkTheme } from "./theme";
import Toggle from "../components/DarkTheme";
import { AuthContext } from "../Context/AuthContext";

export default function LandingPage() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      history.push("/home");
    }
  });

  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
      });
  }

  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <>
      <FadeIn>
        <p className="p-3">
          <Toggle />
        </p>
        <div
          className="d-flex align-items-center justify-content-center main-bg w-100"
          style={{ height: "80vh" }}
        >
          <div className="text-center">
            <p className="text-pattarai">PATTARAI</p>
            <p className="title-word">Mini Conf</p>
            <Button class="customButton" onClick={signInWithGoogle}>
              SIGN IN
            </Button>
          </div>
        </div>
      </FadeIn>
      <Particles />
    </>
  );
}
