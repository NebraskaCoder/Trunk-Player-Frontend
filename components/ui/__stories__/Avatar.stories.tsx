/* eslint-disable react/jsx-no-literals */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Ui/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: {
    // @ts-expect-error
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
  },
  render: (_a, c) => (
    <Avatar>
      <AvatarImage
        // @ts-expect-error
        src={c.args.src}
        // @ts-expect-error
        alt={c.args.alt}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  args: {
    children: "CN",
  },
  render: (a) => (
    <Avatar>
      <AvatarFallback>{a.children}</AvatarFallback>
    </Avatar>
  ),
};
