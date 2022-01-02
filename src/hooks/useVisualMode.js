import {useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode,
    transition: (newMode, replace = false) => {
      if (replace) {
        setMode(newMode);
        history[history.length - 1] = newMode;
        setHistory(history);
      } else {
        setMode(newMode);
        setHistory([...history, newMode])
      }
    },
    back: () => {
      if (history.length > 1) {
        history.splice(-1);
        setHistory(history);
        setMode(history[history.length - 1]);
      }
    }
  }
}