import React from "react";
import { Button } from "react-aria-components";
import { VisuallyHidden } from "react-aria";

interface SquareProps {
  /**
   * Interface for the value of the square
   *
   * @param {string} value - The value of the square (X, O, or null)
   * @param {function} onClick - The function to call when the square is clicked
   */
  value: "X" | "O" | null;
  onClick: () => void;
  description: string;
}

const Square: React.FC<SquareProps> = ({ value, onClick, description }) => {
  return (
    <Button
      onPress={onClick}
      aria-label={`${description} is ${value ? ` ${value}` : " empty"}`}
      className="flex justify-center items-center border-2 border-gray-200 size-16 md:size-24 lg:size-32"
    >
      <VisuallyHidden>{value}</VisuallyHidden>
      <div className="text-2xl font-bold">{value}</div>
    </Button>
  );
};

export default Square;
