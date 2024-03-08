"use client";
import React, { useRef, useState } from "react";
import Board from "../components/Board";
import { calculateWinner, checkDraw } from "../utils/gamelogic";

export default function GamePage() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const isDraw = checkDraw(current.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col p-10 text-2xl font-semibold">{status}</div>
      <Board
        className="col-span-2"
        squares={current.squares}
        onClick={handleClick}
      />
    </div>
  );
}
