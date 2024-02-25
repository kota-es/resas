import { FC, ReactNode } from "react";
import { button } from "./Button.css";

export type Props = {
  onClick?: () => void;
  children: ReactNode;
};

export const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button className={button} onClick={onClick}>
      {children}
    </button>
  );
};
