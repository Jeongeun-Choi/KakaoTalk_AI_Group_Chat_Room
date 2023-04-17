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

type ChatRoomType = {
  id?: number;
  name: string;
  memberCount: string;
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
  const { getAll, add, update } = getActions<ChatRoomType>("chat_room_list");

  const [chatRoomList, setChatRoomList] = useState<ChatRoomType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    modalType: "add",
    modalTitle: "",
    submitButtonText: "",
  });
  const [editRoomInfo, setEditRoomInfo] = useState<RoomInfo | null>({
    name: "",
    memberCount: "",
    id: 0,
  });

  const getAllRoomList = useCallback(async () => {
    const roomList: any = await getAll();
    setChatRoomList(roomList);
  }, [getAll]);

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
      console.log(roomId);
      if (!roomId) {
        return;
      }

      // chatRoomList에서 roomId에 맞는 room 정보 가져와서 데이터 넣기
      const roomInfo = chatRoomList.find(
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
    [chatRoomList]
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setEditRoomInfo(null);
  }, []);

  const handleSubmitAddingRoom = useCallback(
    async ({ name, memberCount }: RoomInfo) => {
      try {
        const response = await add({
          name: name,
          memberCount,
        });

        setChatRoomList((prev) =>
          prev.concat({
            name,
            memberCount,
            id: parseInt(response as string, 10),
          })
        );
        handleCloseModal();
      } catch (e) {
        console.error(e);
      }
    },
    [add, handleCloseModal]
  );

  const handleSubmitUpdatingRoom = useCallback(
    async ({ name, memberCount, id }: RoomInfo) => {
      try {
        await update({ id, name, memberCount });

        setChatRoomList((prev) => prev.filter((item) => item.id !== id));
        handleCloseModal();
      } catch (e) {
        console.error(e);
      }
    },
    [handleCloseModal, update]
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
    getAllRoomList();
  }, [getAllRoomList]);

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
          {chatRoomList.map((chat) => (
            <ListItem
              key={chat.id}
              memberCount={chat.memberCount}
              roomName={chat.name}
              roomId={chat?.id || 0}
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
        onSubmit={
          editRoomInfo ? handleSubmitUpdatingRoom : handleSubmitAddingRoom
        }
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
