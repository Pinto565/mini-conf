import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
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
  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedUser(user);
      history.push("/home");
    }
  });

  const signInWithGoogle = async () => {
    const provider = await new GoogleAuthProvider();
    await signInWithPopup(auth, provider).catch((err) => console.log(err));
  };

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
