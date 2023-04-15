import { ModalProps } from "@chakra-ui/react";
import { CSSProperties, ChangeEventHandler } from "react";

export type RoomInfo = {
  roomName: string;
  memberCount: string;
};
export interface EditRoomModalProps extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  editRoomName?: string;
  editRoomInfo?: RoomInfo;
  modalContentStyle?: CSSProperties;
  modalTitle: string;
  submitButtonText: string;
  onClose: () => void;
  onSubmit?: (roomName: string, memberCount: string) => void;
}
