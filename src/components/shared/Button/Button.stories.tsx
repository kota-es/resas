import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/shared/Button";

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    children: "ボタン",
    onClick: () => {},
  },
};
