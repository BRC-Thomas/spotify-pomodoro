import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action, ThunkAction } from "@reduxjs/toolkit";

type SessionType = {
  value: number;
  runningValue: number;
};

type DisplayedValueType = {
  value: number;
  heading: string;
};

type ChronoState = {
  session: SessionType;
  pause: SessionType;
  isPlaying: boolean;
  intervalID: number | undefined;
  cycles: number;
  displayedValue: DisplayedValueType;
};

const initialState: ChronoState = {
  session: {
    value: 1500,
    runningValue: 1500,
  },
  pause: {
    value: 300,
    runningValue: 300,
  },
  isPlaying: false,
  intervalID: undefined,
  cycles: 0,
  displayedValue: {
    value: 1500,
    heading: "Work",
  },
};

const chrono = createSlice({
  name: "chrono",
  initialState,
  reducers: {
    updateChronoValues: (
      state,
      action: PayloadAction<{ type: "session" | "pause"; value: number }>
    ) => {
      const chosenState =
        action.payload.type === "session" ? state.session : state.pause;

      //Bloque en dessous de 1
      if (chosenState.value + action.payload.value === 0) return;

      if (action.payload.type === "session") {
        if (!state.isPlaying) {
          chosenState.value += action.payload.value;
          chosenState.runningValue += action.payload.value;
          state.displayedValue.value = chosenState.runningValue;
        } else {
          chosenState.value += action.payload.value;
        }
      } else if (action.payload.type === "pause") {
        chosenState.value += action.payload.value;
      }
    },
    tick: (state) => {
      console.log("TICK");
    },
    setUpChrono: (state, action) => {
      state.isPlaying = true;
      state.intervalID = action.payload;
    },
    resetChrono: (state, action) => {
      window.clearInterval(state.intervalID);
      state.isPlaying = false;
    },
  },
});

export function startChrono(
  action: PayloadAction<{ type: "session" | "pause"; value: number }>
): ThunkAction<void, any, unknown, Action> {
  return (dispatch, getState) => {
    const intervalID = setInterval(() => {
      dispatch(tick());
    }, 1000);
    dispatch(setUpChrono(intervalID));
    dispatch(tick());
  };
}

export const { updateChronoValues, setUpChrono, resetChrono, tick } =
  chrono.actions;

export default chrono.reducer;
