import { SettingsIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { MouseEvent, useCallback, useMemo } from "react";
import MorePopover from "../Popover/MorePopover";

type ListItemProps = {
  memberCount: string;
  roomName: string;
  roomId: number;
  height?: string;
  onOpenEditModal: (event: MouseEvent<HTMLButtonElement>) => void;
  onDeleteRoom: (event: MouseEvent<HTMLButtonElement>) => void;
};

const IconButtonStyle = {
  backgroundColor: "transparent",
};

function ListItem({
  memberCount,
  roomName,
  roomId,
  height = "50px",
  onOpenEditModal,
  onDeleteRoom,
}: ListItemProps) {
  const contentStyle = useMemo(
    () => ({
      backgroundColor: "#fff",
      fontSize: "12px",
    }),
    []
  );

  const bodyContents = [
    {
      id: "edit",
      roomId,
      text: "수정",
      onClick: onOpenEditModal,
      style: contentStyle,
    },
    {
      id: "delete",
      roomId,
      text: "삭제",
      onClick: onDeleteRoom,
      style: contentStyle,
    },
  ];

  const renderSettingIcon = useCallback(() => {
    return (
      <IconButton
        aria-label="button"
        style={IconButtonStyle}
        data-room-id={roomId}
      >
        <SettingsIcon />
      </IconButton>
    );
  }, [roomId]);

  return (
    <ItemContainer height={height}>
      <RoomInfo href={`/chat-list/${roomId}`}>
        <span>{roomName}</span>
        <span>[{memberCount}]</span>
      </RoomInfo>
      <MorePopover
        triggerElement={renderSettingIcon()}
        bodyContents={bodyContents}
        placement="bottom-end"
      />
    </ItemContainer>
  );
}

export default ListItem;

const ItemContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  :hover {
    background-color: #e4d0d0;
    transition: all 0.7s ease-out;
  }
`;

const RoomInfo = styled(Link)`
  display: flex;
  align-items: center;
`;
