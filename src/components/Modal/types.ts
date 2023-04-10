import { ChangeEventHandler } from "react";

export type EditRoomModalProps = {
  isOpen: boolean;
  buttonText?: string;
  value: string;
  onChangeValue: (event: ChangeEventHandler<HTMLSelectElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
};
