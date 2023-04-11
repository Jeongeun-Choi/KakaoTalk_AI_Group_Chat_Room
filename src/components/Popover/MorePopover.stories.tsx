// MorePopover.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import MorePopover from "./MorePopover";
import { Button } from "@chakra-ui/react";

const meta: Meta<typeof MorePopover> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "MorePopover",
  component: MorePopover,
};

export default meta;
type Story = StoryObj<typeof MorePopover>;

const triggerElement = () => <Button>Open Popover</Button>;

const style = {
  backgroundColor: "transparent",
  width: "50px",
};
const bodyContents = [
  { text: "수정", style },
  { text: "삭제", style },
];

export const Primary: Story = {
  args: {
    triggerElement: triggerElement(),
    bodyContents,
    placement: "bottom-end",
  },
};
