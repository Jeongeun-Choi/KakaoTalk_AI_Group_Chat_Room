import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getActions } from "@/utils/db";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const initMessage = {
  roomId: -1,
  message: "",
  isMine: false,
  time: new Date(),
  isLoading: true,
};

function ChatRoom() {
  const { getAll: getApiKeys } = getActions("api_key");
  const { add, getManyByKey: getMessage } = getActions("messages");

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { query } = router;
  const { roomId } = query;

  const [messageList, setMessageList] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState<string>("");

  const handleSubmitChat = useCallback(async () => {
    if (!inputRef.current) {
      return;
    }

    const value = inputRef.current.value;
    if (!value) {
      return;
    }

    const mineMessage = {
      roomId,
      message: value,
      isMine: true,
      time: new Date().getTime(),
    };
    inputRef.current.value = "";
    setMessageList((prev) => prev.concat([mineMessage, initMessage]));
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ apiKey, prompt: value }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const text = data.response?.choices[0].text;

      const aiMessage = {
        roomId,
        message: text,
        isMine: false,
        time: data.response?.created * 1000,
      };

      await add(mineMessage);
      await add(aiMessage);
      setMessageList((prev) => prev.concat([aiMessage]));
    } catch (e) {
      console.error(e);
    } finally {
      // 임의 메시지 넣은거 삭제
      setMessageList((prev) => prev.filter((value) => !value.isLoading));
    }
  }, [apiKey, roomId, add]);

  const handleKeyDownEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const code = e.code;

      if (code === "Enter" && !e.nativeEvent.isComposing) {
        handleSubmitChat();
      }
    },
    [handleSubmitChat]
  );

  useEffect(() => {
    if (roomId) {
      getMessage("roomId", roomId as string).then((res) => {
        setMessageList(res);
      });
    }
  }, []);

  useEffect(() => {
    getApiKeys().then((res) => {
      console.log("key", res[0].apiKey);
      setApiKey(res[0]?.apiKey || "");
    });
  }, []);

  return (
    <ChatContainer>
      <ChatList>
        {messageList?.map((message, index) => (
          <Chat key={index} isMine={message.isMine}>
            <MessageText
              isMine={message.isMine}
              className={message.isLoading && "bubble-loader"}
            >
              <p>{message?.message}</p>
            </MessageText>
          </Chat>
        ))}
      </ChatList>
      <SendContainer>
        <input
          ref={inputRef}
          placeholder="메시지를 보내세요."
          onKeyDown={handleKeyDownEnter}
        />
        <button onClick={handleSubmitChat}>전송</button>
      </SendContainer>
    </ChatContainer>
  );
}

export default ChatRoom;

const ChatContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ChatList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  list-style: none;
  overflow-y: scroll;
  /* 말풍선 메시지 로딩 애니메이션 */
  @keyframes message-loading {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  /* 말풍선 메시지 로딩 스타일 */
  .bubble-loader {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 40px;
  }

  .bubble-loader:before {
    content: "";
    position: absolute;
    top: 6px;
    left: 36px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #888;
    animation: message-loading 1s infinite linear;
  }
`;

const Chat = styled.li<{ isMine: boolean }>`
  display: flex;
  position: relative;
  margin: 10px;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  color: ${(props) => (props.isMine ? "black" : "white")};
`;

const MessageText = styled.div<{ isMine: boolean }>`
  display: inline-block;
  position: relative;
  background-color: ${(props) => (props.isMine ? "#fff" : "#000")};
  border-radius: 10px;
  padding: 10px;
  word-wrap: break-word;

  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const SendContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  /* border-radius: 20px; */
  padding: 10px;
  position: relative;
  bottom: 0;

  input {
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    margin-right: 10px;
  }

  button {
    background-color: #eaafb9;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
  }
`;
