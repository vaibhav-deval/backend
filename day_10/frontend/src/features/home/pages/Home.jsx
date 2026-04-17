import Navbar from "../../shared/components/Navbar";
import FaceExpression from "../../Expressions/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import "./../style/home.scss";

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <section className="expression-section">
          <h2>Detect Your Mood</h2>
          <FaceExpression
            onClick={(expression) => {
              handleGetSong({ mood: expression });
            }}
          />
        </section>
        <section className="player-section">
          <Player />
        </section>
      </main>
    </div>
  );
};

export default Home;
