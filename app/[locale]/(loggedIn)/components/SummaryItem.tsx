import { forwardRef, type ComponentPropsWithRef, type ReactNode } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface CardProps extends ComponentPropsWithRef<typeof Card> {
  title: string;
  children?: ReactNode;
}

const SummaryItem = forwardRef<HTMLDivElement, CardProps>(
  ({ title, children, ...cardProps }, ref) => {
    return (
      <Card
        ref={ref}
        {...cardProps}
      >
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl">{children}</CardTitle>
        </CardHeader>
      </Card>
    );
  }
);

SummaryItem.displayName = "SummaryItem";

export default SummaryItem;
