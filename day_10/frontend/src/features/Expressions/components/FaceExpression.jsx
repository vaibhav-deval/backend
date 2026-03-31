import { useEffect, useRef, useState } from "react";
import { init, detect } from "../Utils/utils";
export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let isMounted = true;

    const start = async () => {
      await init({ landmarkerRef, videoRef, streamRef });
      if (!isMounted) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      }
    };

    start();

    return () => {
      isMounted = false;
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  const handleClick = async () => {
    const expression = detect({ landmarkerRef, videoRef, setExpression });

    onClick(expression);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        get expression
      </button>
    </div>
  );
}
