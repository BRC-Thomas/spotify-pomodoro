import {
  PlayCircle,
  PauseCircle,
  ChevronLast,
  ChevronFirst,
} from "lucide-react";
import UpdateTimeButton from "./components/UpdateTimeButton";
import ToggleButton from "./components/ToggleButton";
import { useAppSelector } from "./hooks";
import getFormattedValue from "./utils/getFormattedValue";

function App() {
  const chronoValues = useAppSelector((state) => state.chrono);
  return (
    <div className="bg-black text-slate-100 pt-20 min-h-screen">
      <div className="max-w-xl mx-auto shadow-[#000] shadow-2xl rounded-2xl p-10">
        <h1 className="text-center text-3xl mb-8">Pomodoro</h1>
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          {/* Spotify Section */}
          <section className="w-1/2">
            <div className="h-56 w-full bg-green">
              <img
                src="../public/images/icons/Spotify_Icon_RGB_White.png"
                alt="spotify logo"
                className="h-full w-full object-contain p-2 flex-shrink-0"
              />
            </div>

            {/* Spotify info */}
            <div className="flex flex-col">
              <p>title</p>
              <p>artist</p>
              <div className="w-1/2 mx-auto flex justify-between">
                <span>
                  <ChevronFirst />
                </span>
                <span>
                  <PlayCircle />
                </span>
                {/*<span><PauseCircle/></span>*/}
                <span>
                  <ChevronLast />
                </span>
              </div>
            </div>
          </section>

          {/* Pomodoro Section */}
          <section className="w-1/2">
            <div className="flex justify-center mb-8">
              {/* Session Block */}
              <div className="mr-5">
                <p className="text-center mb-1">Sessions</p>
                <div className="flex">
                  <UpdateTimeButton sign={"-"} type={"session"} />
                  <p className="mx-3 text-xl">
                    {chronoValues.session.value / 60}
                  </p>
                  <UpdateTimeButton sign={"+"} type={"session"} />
                </div>
              </div>

              {/* Pause Block */}

              {/* Session Block */}
              <div>
                <p className="text-center mb-1">Pauses</p>
                <div className="flex">
                  <UpdateTimeButton sign={"-"} type={"pause"} />
                  <p className="mx-3 text-xl">
                    {chronoValues.pause.value / 60}
                  </p>
                  <UpdateTimeButton sign={"+"} type={"pause"} />
                </div>
              </div>
            </div>

            <p className="text-center mb-2 text-xl font-semibold">
              {chronoValues.displayedValue.heading}
            </p>

            <p className="text-center flex justify-center mb-1">
              <span className="text-4xl p-4 rounded bg-slate-300 text-black">
                {getFormattedValue(chronoValues.displayedValue.value)}
              </span>
            </p>
            <p className="mb-10 text-center">
              Passed cycle(s) : {chronoValues.cycles}
            </p>
            <ToggleButton />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
