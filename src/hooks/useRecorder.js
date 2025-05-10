"use client";
import { useRef, useState } from "react";

export default function useRecorder(
  targetRef,
  { fps = 30, mimeType, fileName = "download.webm" } = {}
) {
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [isRecording, setRec] = useState(false);

  const start = () => {
    if (!targetRef.current || isRecording) return;
    const stream = targetRef.current.captureStream(fps);
    mediaRecorder.current = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.current.onstop = handleStop;
    mediaRecorder.current.start();
    setRec(true);
  };

  const stop = () => {
    mediaRecorder.current?.stop();
  };

  const handleStop = () => {
    setRec(false);
    const blob = new Blob(chunks.current, { type: mediaRecorder.current.mimeType });
    chunks.current = [];
    const url = URL.createObjectURL(blob);

    // auto‑download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { isRecording, start, stop };
}