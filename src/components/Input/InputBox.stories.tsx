// InputBox.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import InputBox from "./InputBox";

const meta: Meta<typeof InputBox> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "InputBox",
  component: InputBox,
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Primary: Story = {
  args: {
    label: "방 이름",
    placeholder: "2 ~ 10글자로 입력해주세요.",
  },
};

export const Error: Story = {
  args: {
    label: "방 이름",
    placeholder: "2 ~ 10글자로 입력해주세요.",
    value: "test123456789",
    isInvalid: true,
    errorBorderColor: "crimson",
    errorText: "글자 수를 바르게 입력해주세요.",
  },
};
