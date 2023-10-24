import { useAppDispatch, useAppSelector } from "../hooks";
import { updateChronoValues } from "../features/chrono";

type UpdateTimeButtonProps = {
  type: "session" | "pause";
  sign: string;
};

function UpdateTimeButton({ type, sign }: UpdateTimeButtonProps) {
  const dispatch = useAppDispatch();

  function handleUpdate() {
    const value: string | number = sign === "+" ? 60 : -60;
    dispatch(updateChronoValues({ type, value }));
  }

  return (
    <button
      onClick={handleUpdate}
      className="w-8 h-8 text-4xl text-slate-700 bg-slate-200 rounded flex justify-center items-center"
    >
      <span className="relative bottom-1 pointer-events-none">{sign}</span>
    </button>
  );
}

export default UpdateTimeButton;
