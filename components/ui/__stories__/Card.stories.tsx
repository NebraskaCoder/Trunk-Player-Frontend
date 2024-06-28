/* eslint-disable react/jsx-no-literals */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Card",
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ExampleCard: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </>
    ),
  },
};

const SystemCard = ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      {/* {description && <CardDescription>{description}</CardDescription>} */}
    </CardHeader>
    {description && (
      <CardContent>
        <p>{description}</p>
      </CardContent>
    )}
    {/* <CardFooter>
      <p>Card Footer</p>
    </CardFooter> */}
  </Card>
);

export const ListOfSystems: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <SystemCard
        name="NYC Interoperable Communications Network (NYCICN)"
        description="The NYC Interoperable Communications Network (NYCICN) is a trunked radio system. It uses the P25 standard for emergency and municipal communication. The network features Motorola's Dynamic Dual Mode technology."
      />
      <SystemCard name="U.S. Marshals Service" />
    </div>
  ),
};
