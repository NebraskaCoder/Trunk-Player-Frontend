import { HTMLAttributes, forwardRef } from "react";

const H1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children }, ref) => {
    return (
      <h1
        ref={ref}
        className="text-2xl font-bold"
      >
        {children}
      </h1>
    );
  }
);

H1.displayName = "H1";

export default H1;
