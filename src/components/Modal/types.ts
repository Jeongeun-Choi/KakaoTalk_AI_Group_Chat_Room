import { ModalProps } from "@chakra-ui/react";
import { CSSProperties, ChangeEventHandler, ReactElement } from "react";

export interface EditRoomModalProps extends ModalProps {
  isOpen: boolean;
  value: string;
  modalContentStyle?: CSSProperties;
  modalTitle: string;
  footerComponent?: ReactElement;
  onChangeValue: (event: ChangeEventHandler<HTMLSelectElement>) => void;
  onClose: () => void;
}
