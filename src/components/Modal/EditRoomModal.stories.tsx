// EditRoomModal.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import EditRoomModal from "./EditRoomModal";
import { Button } from "@chakra-ui/react";

const meta: Meta<typeof EditRoomModal> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "EditRoomModal",
  component: EditRoomModal,
};

export default meta;
type Story = StoryObj<typeof EditRoomModal>;

const footerComponent = () => <Button>생성</Button>;

export const NewChatRoom: Story = {
  args: {
    isOpen: true,
    modalTitle: "방 생성",
    modalContentStyle: { height: "300px" },
    footerComponent: footerComponent(),
  },
};
