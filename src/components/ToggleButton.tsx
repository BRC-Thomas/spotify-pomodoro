import { Play  } from "lucide-react";

function ToggleButton() {
  return (
    <button className="px-4 py-2 text-black flex justify-center items-center mx-auto bg-slate-300 rounded hover:bg-slate-200">
      <span className="mr-3 text-lg">Start</span>
      <span className="w-5">
        <Play />
      </span>
    </button>
  );
}
export default ToggleButton;
