import React, { useReducer } from "react";
import "./App.css";

type State = {
  guess: string;
  message: string;
  trials: number;
  number: number;
  gameOver: boolean;
};

type Action =
  | { type: "GUESS" }
  | { type: "SET_GUESS"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  guess: "",
  message: "Guess a number between 1 and 100",
  trials: 10,
  number: Math.floor(Math.random() * 100) + 1,
  gameOver: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === "SET_GUESS") {
    return { ...state, guess: action.payload };
  }

  if (action.type === "GUESS") {
    const guess = parseInt(state.guess);
    if (state.gameOver || isNaN(guess)) return state;

    if (guess === state.number) {
      return {
        ...state,
        message: `YOU WIN!The secret number was ${guess}! Your score is ${state.trials * 10}%`,
        gameOver: true,
      };
    }

    if (state.trials - 1 === 0) {
      return {
        ...state,
        message: `YOU LOST!The secret number was  ${state.number}`,
        gameOver: true,
        trials: 0,
      };
    }

    return {
      ...state,
      message: guess < state.number ? "Too Low" : "Too High",
      trials: state.trials - 1,
      guess: "",
    };
  }

  if (action.type === "RESET") {
    return {
      ...initialState,
      number: Math.floor(Math.random() * 100) + 1,
    };
  }

  return state;
}

const NumberGuessGame: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
   const messageClass = state.message.startsWith("YOU LOST!")
    ? "lost-message"
    : "";

  return (
    <div className="game-container">
      <h1 className="title">NUMBER GUESSING GAME</h1>
      <h2>Guess a number between 1 and 100</h2>
      <button className="new-game" onClick={() => dispatch({ type: "RESET" })}>
        New Game
      </button>

      <p>{state.trials} TRIALS REMAINING.</p>

      <input
        type="number"
        value={state.guess}
        disabled={state.gameOver}
        onChange={(e) =>
          dispatch({ type: "SET_GUESS", payload: e.target.value })
        }
      />

      <p className={messageClass}>{state.message}</p>
      <button
        onClick={() => dispatch({ type: "GUESS" })}
        disabled={state.gameOver}
        className="guess-btn"
      >
        Guess
      </button>
    </div>
  );
};

export default NumberGuessGame;
