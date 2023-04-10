import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { EditRoomModalProps } from "./types";
import { InputBox } from "../Input";
import SelectLabel from "../Select/SelectLabel";

function EditRoomModal({
  isOpen,
  buttonText = "생성",
  value,
  onChangeValue,
  onClose,
  onSubmit,
}: EditRoomModalProps) {
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <InputBox label="방 이름" placeholder="2~10자리를 입력해주세요." />
        <SelectLabel
          label="방 인원"
          value={value}
          onChangeValue={onChangeValue}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onSubmit}>{buttonText}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}

export default EditRoomModal;
