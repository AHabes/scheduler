import {useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode,
    transition: (newMode, replace = false) => {
      if (replace) {
        setMode(newMode);
        const updatedState = history.slice(); //copy the state array.
        updatedState[updatedState.length - 1] = newMode;
        setHistory(updatedState);
      } else {
        setMode(newMode);
        setHistory([...history, newMode])
      }
    },
    back: () => {
      if (history.length > 1) {
        const updatedState = history.slice(); // copy the state array.
        updatedState.splice(-1); // remove the latest mode from history.

        setHistory(updatedState);
        setMode(updatedState[updatedState.length - 1]); // set the mode to the latest mode in history.
      }
    }
  }
}