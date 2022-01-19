import {useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {
    mode,
    transition: function (newMode, replace = false) {
      if (!replace) {
        setMode(newMode);
        const updatedHistory = [...history];  // copy the state array.
        updatedHistory.push(newMode); // push the latest mode to history.
        setHistory(updatedHistory);
      }
      setMode(newMode);
    },
    back: () => {
      if (history.length > 1) {
        const updatedHistory = [...history]; // copy the state array.
        updatedHistory.pop(); // remove the latest mode from history.
        setHistory(updatedHistory);
        setMode(updatedHistory[updatedHistory.length - 1]);
      }
    }
  }
}