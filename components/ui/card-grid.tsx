// Custom ui component

import * as React from "react";

import { cn } from "@/lib/utils";

const CardGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4",
      className
    )}
    {...props}
  />
));

CardGrid.displayName = "CardGrid";

export { CardGrid };
