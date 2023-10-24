import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { startChrono, resetChrono } from "../features/chrono";
import { Play, RotateCcw } from "lucide-react";

function ToggleButton() {
  const chronoValues = useSelector((state: RootState) => state.chrono);
  const dispatch = useDispatch<AppDispatch>();

  function toggleChrono() {
    if (!chronoValues.isPlaying) {
      dispatch(
        startChrono({
          payload: { type: "session", value: 60 },
          type: "startChrono",
        })
      );
    } else {
      dispatch(
        resetChrono({
          payload: { type: "pause", value: 0 },
          type: "resetChrono",
        })
      );
    }
  }

  return (
    <button
      onClick={toggleChrono}
      className="px-4 py-2 text-black flex justify-center items-center mx-auto bg-slate-300 rounded hover:bg-slate-200"
    >
      <span className="mr-3 text-lg">
        {chronoValues.isPlaying ? "Reset" : "Start"}
      </span>
      <span className="w-5">
        {chronoValues.isPlaying ? <RotateCcw /> : <Play />}
      </span>
    </button>
  );
}
export default ToggleButton;
