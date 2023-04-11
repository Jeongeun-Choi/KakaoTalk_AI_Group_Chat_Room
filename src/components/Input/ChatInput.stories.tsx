// ChatInput.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import ChatInput from "./ChatInput";

const meta: Meta<typeof ChatInput> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ChatInput",
  component: ChatInput,
  argTypes: {
    size: {
      options: ["lg"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Primary: Story = {
  args: {
    placeholder: "메시지를 입력하세요.",
    size: "lg",
  },
};
