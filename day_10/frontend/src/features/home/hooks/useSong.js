import { getSong } from "../service/song.api";
import {SongContext} from "../song.context";
import { useContext } from "react";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;
  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
  }
  return { loading, song, handleGetSong };
};
