import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { EditRoomModalProps } from "./types";
import { InputBox } from "../Input";
import SelectLabel from "../Select/SelectLabel";

function EditRoomModal({
  isOpen,
  value,
  modalTitle,
  modalContentStyle,
  footerComponent,
  onChangeValue,
  onClose,
}: EditRoomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={modalContentStyle}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <RoomModalBody>
          <InputBox label="방 이름" placeholder="2~10자리를 입력해주세요." />
          <SelectLabel
            label="방 인원"
            value={value}
            onChangeValue={onChangeValue}
          />
        </RoomModalBody>
        <ModalFooter>{footerComponent}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditRoomModal;

const RoomModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
