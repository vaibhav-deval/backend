import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );
    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  if (!videoRef?.current) {
    console.warn("FaceExpression init: videoRef not available; aborting stream assignment");
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    return;
  }

  videoRef.current.srcObject = streamRef.current;
  await videoRef.current.play();
  } catch (error) {
    console.error("FaceExpression init error:", error);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (!landmarkerRef.current || !videoRef.current) return;
  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );
  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;
    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;
    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");
    let currentExpression = "Neutral";
    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression = "happy";
    } else if (jawOpen > 0.4 && browUp > 0.3) {
      currentExpression = "surprised";
    } else if (frownLeft > 0.02 && frownRight > 0.02) {
      currentExpression = "sad";
    }
    setExpression(currentExpression);
    
    return currentExpression;
  }
};
