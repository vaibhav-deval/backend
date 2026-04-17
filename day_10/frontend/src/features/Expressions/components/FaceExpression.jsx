import { useEffect, useRef, useState } from "react";
import { init, detect } from "../Utils/utils";
import "./face-expression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const [isDetecting, setIsDetecting] = useState(false);

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
    setIsDetecting(true);
    const detectedExpression = detect({ landmarkerRef, videoRef, setExpression });
    onClick(detectedExpression);
    setTimeout(() => setIsDetecting(false), 1000);
  };

  return (
    <div className="face-expression">
      <div className="video-container">
        <video
          ref={videoRef}
          playsInline
        />
        <div className="overlay">
          <span>📹</span>
        </div>
      </div>
      <div className={`expression-display ${expression.toLowerCase()}`}>
        {expression}
      </div>
      <button
        className="detect-btn button"
        onClick={handleClick}
        disabled={isDetecting}
      >
        {isDetecting ? "Detecting..." : "Get Expression"}
      </button>
    </div>
  );
}
