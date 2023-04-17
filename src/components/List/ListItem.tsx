import { SettingsIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MouseEvent, useCallback } from "react";
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
  const bodyContents = [
    { id: "edit", roomId, text: "수정", onClick: onOpenEditModal },
    { id: "delete", roomId, text: "삭제", onClick: onDeleteRoom },
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
      <RoomInfo>
        <span>{roomName}</span>
        <span>[{memberCount}]</span>
      </RoomInfo>
      <MorePopover
        triggerElement={renderSettingIcon()}
        bodyContents={bodyContents}
      />
    </ItemContainer>
  );
}

export default ListItem;

const ItemContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
`;
