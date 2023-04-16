import styled from "@emotion/styled";
import { AddIcon } from "@chakra-ui/icons";
import ListItem from "@/components/List/ListItem";
import { Box, IconButton } from "@chakra-ui/react";
import EditRoomModal from "@/components/Modal/EditRoomModal";
import {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { RoomInfo } from "@/components/Modal/types";
import { getActions } from "@/utils/db";

type ModalInfo = {
  modalType: "add" | "edit";
  modalTitle: string;
  modalContentStyle?: CSSProperties;
  submitButtonText: string;
};

const chatList = [
  {
    id: 1,
    memberCount: "2",
    roomName: "테스트 방",
  },
  {
    id: 2,
    memberCount: "5",
    roomName: "AI 많은 방",
  },
];
function ChatList() {
  const { getAll, add } = getActions<{
    name: string;
    memberCount: number;
    id: 1;
  }>("chat_room_list");

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    modalType: "add",
    modalTitle: "",
    submitButtonText: "",
  });
  const [editRoomInfo, setEditRoomInfo] = useState<RoomInfo>({
    roomName: "",
    memberCount: "",
  });

  const handleOpenAddingModal = useCallback(() => {
    setIsOpenModal(true);
    setModalInfo({
      modalType: "add",
      modalTitle: "방 생성",
      submitButtonText: "생성",
    });
  }, []);

  const handleOpenEditingModal = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { currentTarget } = event;
      if (!currentTarget || !currentTarget.dataset) {
        return;
      }

      const { roomId } = currentTarget.dataset;

      if (!roomId) {
        return;
      }

      // chatRoomList에서 roomId에 맞는 room 정보 가져와서 데이터 넣기
      const roomInfo = chatList.find(
        (chat) => chat.id === parseInt(roomId, 10)
      );

      if (!roomInfo) {
        return;
      }
      setEditRoomInfo(roomInfo);
      setIsOpenModal(true);
      setModalInfo({
        modalType: "edit",
        modalTitle: "방 수정",
        submitButtonText: "수정",
      });
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setEditRoomInfo({ roomName: "", memberCount: "" });
  }, []);

  const handleSubmitAddingRoom = useCallback(
    async (roomName: string, memberCount: string) => {
      const params = { roomName, memberCount };
      //api 요청 보내기

      const response = await add({
        name: roomName,
        memberCount: parseInt(memberCount, 10),
        id: 1,
      });

      console.log(response);
    },
    [add]
  );

  const handleSubmitUpdatingRoom = useCallback(
    (id: string, roomName: string, memberCount: string) => {},
    []
  );

  const handleDeleteRoom = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { currentTarget } = event;
      if (!currentTarget || !currentTarget.dataset) {
        return;
      }

      const { roomId } = currentTarget.dataset;

      if (!roomId) {
        return;
      }

      //alert(`${roomName} 방을 삭제하시겠습니까?`)
    },
    []
  );

  useEffect(() => {
    getAll()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e));
  }, [getAll]);

  return (
    <>
      <ChatListContainer>
        <Header bgColor="pink.300">
          <div>로고</div>
          <IconButton
            colorScheme="none"
            aria-label="Add ChatRoom"
            color="black"
            onClick={handleOpenAddingModal}
          >
            <AddIcon />
          </IconButton>
        </Header>
        <Main>
          {chatList.map((chat) => (
            <ListItem
              key={chat.id}
              memberCount={chat.memberCount}
              roomName={chat.roomName}
              roomId={chat.id}
              onOpenEditModal={handleOpenEditingModal}
              onDeleteRoom={handleDeleteRoom}
            />
          ))}
        </Main>
      </ChatListContainer>
      <EditRoomModal
        isOpen={isOpenModal}
        isCentered
        editRoomInfo={editRoomInfo}
        modalTitle={modalInfo.modalTitle}
        submitButtonText={modalInfo.submitButtonText}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAddingRoom}
      />
    </>
  );
}

export default ChatList;

const ChatListContainer = styled(Box)`
  /* width: 90%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Main = styled.main`
  width: 100%;
  padding: 10px;
`;
