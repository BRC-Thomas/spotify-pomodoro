import UpdateTimeButton from "./components/UpdateTimeButton";
import ToggleButton from "./components/ToggleButton";
import { useAppSelector } from "./hooks";
import getFormattedValue from "./utils/getFormattedValue";
import SpotifySection from "./components/SpotifySection";

function App() {
  const chronoValues = useAppSelector((state) => state.chrono);

  return (
    <div className="bg-black text-slate-100 flex items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto min-h-screen sm:min-h-fit shadow-[#000] shadow-2xl rounded-2xl p-10">
        <h1 className="text-center text-3xl mb-8">Pomodoro</h1>
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          {/* Spotify Section */}
          <SpotifySection />

          {/* Pomodoro Section */}
          <section className="w-full sm:w-1/2">
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
