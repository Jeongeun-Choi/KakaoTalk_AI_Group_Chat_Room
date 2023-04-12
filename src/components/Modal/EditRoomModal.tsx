import { useCallback, useRef, useState, useEffect } from "react";
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
import { InputBoxHandle } from "../Input/types";

function EditRoomModal({
  isOpen,
  roomMemberCount,
  editRoomName,
  modalTitle,
  modalContentStyle,
  submitButtonText,
  onChangeRoomMemberCount,
  onClose,
  onSubmit,
}: EditRoomModalProps) {
  const inputRef = useRef<InputBoxHandle>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const checkRoomNameLen = useCallback((roomName: string) => {
    const lenReg = /^(\w|\W){2,10}$/;

    if (!lenReg.test(roomName)) {
      return false;
    }

    return true;
  }, []);

  const handleClickSubmitButton = useCallback(() => {
    const roomName = inputRef.current?.getInputValue();

    if (!roomName) {
      alert("방 이름을 입력해주세요.");
      return;
    }

    if (!checkRoomNameLen(roomName)) {
      alert("이름 형식이 올바르지 않습니다.");
      setIsInvalid(true);
      return;
    }

    onSubmit(roomName);
  }, [checkRoomNameLen, onSubmit]);

  const handleFocusOn = useCallback(() => {
    setIsInvalid(false);
  }, []);

  useEffect(() => {
    if (editRoomName) {
      // FIXME useEffect 내부에 setTimeout 함수 쓰지 않기..
      setTimeout(() => inputRef.current?.setInputValue(editRoomName), 0);
    }
  }, [editRoomName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={modalContentStyle}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <RoomModalBody>
          <InputBox
            ref={inputRef}
            label="방 이름"
            placeholder="2~10자리를 입력해주세요."
            errorBorderColor="crimson"
            errorText="올바른 형식을 입력해주세요."
            isInvalid={isInvalid}
            onFocus={handleFocusOn}
          />
          <SelectLabel
            label="방 인원"
            value={roomMemberCount}
            onChangeValue={onChangeRoomMemberCount}
          />
        </RoomModalBody>
        <ModalFooter>
          <Button onClick={handleClickSubmitButton}>{submitButtonText}</Button>
        </ModalFooter>
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
