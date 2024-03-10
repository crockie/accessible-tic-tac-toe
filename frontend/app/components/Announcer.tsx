import React from "react";
import { VisuallyHidden } from "react-aria";

interface AnnouncerProps {
  squares: Array<"X" | "O" | null>;
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

const Announcer: React.FC<AnnouncerProps> = ({ squares }) => {
  const squareDescriptions = squares
    .map(
      (square, index) =>
        `The ${indexMapping[index]} square is ${square || "empty"}`
    )
    .join(", ");

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <VisuallyHidden>{squareDescriptions}</VisuallyHidden>
    </div>
  );
};

export default Announcer;
