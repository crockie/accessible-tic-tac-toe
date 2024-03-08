import React from "react";
import { Button } from "react-aria-components";

const DialogButton = ({
  className,
  ...props
}: {
  className: string;
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      {...props}
      className={`inline-flex justify-center rounded-md border border-solid border-transparent px-5 py-2 font-semibold font-[inherit] text-base transition-colors cursor-default outline-none focus-visible:ring-2 ring-blue-500 ring-offset-2 ${className}`}
    />
  );
};

export default DialogButton;
