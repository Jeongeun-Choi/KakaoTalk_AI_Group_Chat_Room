import { ModalProps } from "@chakra-ui/react";
import { CSSProperties, ChangeEventHandler } from "react";

export interface EditRoomModalProps extends ModalProps {
  isOpen: boolean;
  roomMemberCount: string;
  editRoomName?: string;
  modalContentStyle?: CSSProperties;
  modalTitle: string;
  submitButtonText: string;
  onChangeRoomMemberCount: (
    event: ChangeEventHandler<HTMLSelectElement>
  ) => void;
  onClose: () => void;
  onSubmit: (roomName: string) => void;
}
