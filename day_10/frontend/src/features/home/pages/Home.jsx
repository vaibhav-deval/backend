import Navbar from "../../shared/components/Navbar";
import FaceExpression from "../../Expressions/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <>
    <Navbar/>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </>
  );
};

export default Home;
