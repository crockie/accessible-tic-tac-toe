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
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <Button
      onPress={onClick}
      className="flex justify-center items-center border-2 border-gray-200 w-full h-full sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
    >
      <VisuallyHidden>{value}</VisuallyHidden>
      <div className="text-2xl font-bold">{value}</div>
    </Button>
  );
};

export default Square;
