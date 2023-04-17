import { ModalProps } from "@chakra-ui/react";
import { CSSProperties, ChangeEventHandler } from "react";

export type RoomInfo = {
  name: string;
  memberCount: string;
  id?: number;
};
export interface EditRoomModalProps extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  editRoomName?: string;
  editRoomInfo?: RoomInfo | null;
  modalContentStyle?: CSSProperties;
  modalTitle: string;
  submitButtonText: string;
  onClose: () => void;
  onSubmit?: ({ name, memberCount, id }: RoomInfo) => void;
}
