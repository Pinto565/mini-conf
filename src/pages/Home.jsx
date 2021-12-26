import Button from "@material-ui/core/Button";
import { useEffect, useState, useContext } from "react";
import FadeIn from "../animations/FadeIn";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import Particles from "../animations/Particles";
import Toggle from "../components/DarkTheme";
import NoLiveStream from "../assets/images/NoStream.png";
import { ReactFlvPlayer } from "react-flv-player";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [display, setDisplay] = useState({ image: "", video: "none" });
  let { REACT_APP_STREAM_KEY } = process.env;

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  }

  let streams = async () => {
    let stream = await axios
      .get("http://vpn.opencloud.pattarai.in:8000/api/streams", {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .catch((err) => {
        setDisplay({ image: "", video: "none" });
      });
    try {
      let stream_publishers = stream.data.live[REACT_APP_STREAM_KEY].publisher;
      if (stream_publishers == null) {
        await setDisplay({ image: "", video: "none" });
      } else {
        await setDisplay({ image: "none", video: "" });
      }
    } catch (err) {
      setDisplay({ image: "", video: "none" });
    }
    // await console.log(stream_publishers);
  };
  useEffect(() => {
    streams();
    console.log(user);
  }, []);

  return (
    <>
      <FadeIn>
        <section className="d-flex align-items-center justify-content-between mx-4 my-3">
          <Toggle />
          <a
            href="https://www.pattarai.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="img-animation" width="70" height="70" alt="" />
          </a>
          <Button class="customButton" onClick={logout}>
            LOGOUT
          </Button>
        </section>

        <section className="d-flex justify-content-center align-items-center mt-3">
          <div
            className="card"
            style={{
              minHeight: "80vh",
              width: "90%",
              boxShadow:
                "0 8px 16px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
            }}
          >
            <div className="card-body d-md-flex align-items-center d-block">
              <div id="no-stream" style={{ display: display.image }}>
                <img
                  className="img-fluid px-md-3"
                  src={NoLiveStream}
                  height={400}
                  alt=""
                />
                <h5 className="text-center stream-text text-secondary">
                  Live Stream is Down. See You Later..
                </h5>
              </div>
              <div style={{ display: display.video }}>
                <ReactFlvPlayer
                  className="col-12 col-md-8 px-md-3 pb-3 pb-md-0 iframe-height"
                  url={`http://vpn.opencloud.pattarai.in:8000/live/${REACT_APP_STREAM_KEY}.flv`}
                  isLive={true}
                  hasAudio={true}
                  hasVideo={true}
                />
              </div>
              {/* <div className="col-12 col-md-4 iframe-height">
                <Chat />
              </div> */}
              <iframe
                title="Titan Embed"
                className="col-12 col-md-4 iframe-height"
                src="https://titanembeds.com/embed/808401706337435709?css=31"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </section>
      </FadeIn>
      <Particles />
    </>
  );
}
