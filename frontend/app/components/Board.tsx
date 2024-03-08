import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: Array<"X" | "O" | null>;
  onClick: (index: number) => void;
  className?: string;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, className }) => {
  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => onClick(index)} />;
  };

  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 justify-items-center w-full gap-4 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-128 lg:h-128 ${className}`}
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
