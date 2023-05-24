import React from "react";

type ErrorProps = {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="text-3xl">{message}</div>
  );
}
