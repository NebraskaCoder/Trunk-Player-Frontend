import type { ReactNode } from "react";

export interface H1Props {
  children?: ReactNode;
}

const H1 = ({ children }: H1Props) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default H1;
