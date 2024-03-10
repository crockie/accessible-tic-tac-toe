import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: Array<"X" | "O" | null>;
  onClick: (index: number) => void;
  className?: string;
}
const indexMapping: { [key: number]: string } = {
  0: "top-left",
  1: "top-middle",
  2: "top-right",
  3: "middle-left",
  4: "middle-middle",
  5: "middle-right",
  6: "bottom-left",
  7: "bottom-middle",
  8: "bottom-right",
};

const Board: React.FC<BoardProps> = ({ squares, onClick, className }) => {
  const renderSquare = (index: number) => {
    return (
      <Square
        value={squares[index]}
        description={`The ${indexMapping[index]} square`}
        onClick={() => onClick(index)}
      />
    );
  };

  return (
    <div
      role="grid"
      aria-label="Game Board"
      className={`grid grid-cols-3 grid-rows-3 justify-items-center gap-4 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-128 lg:h-128 ${className}`}
    >
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex justify-center">
            {renderSquare(index)}
          </div>
        ))}
    </div>
  );
};

export default Board;
