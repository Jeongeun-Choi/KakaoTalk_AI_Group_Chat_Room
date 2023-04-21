import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getActions } from "@/utils/db";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ apiKey, prompt: value }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const text = data.response?.text;

      const aiMessage = { roomId, message: text, isMine: false };
      const mineMessage = { roomId, message: value, isMine: true };

      await add(mineMessage);
      await add(aiMessage);
      setMessageList((prev) => prev.concat([mineMessage, aiMessage]));
      inputRef.current.value = "";
    } catch (e) {
      console.error(e);
    }
  }, [apiKey, roomId, add]);

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
            <MessageText>
              <p>{message?.message}</p>
            </MessageText>
          </Chat>
        ))}
      </ChatList>
      <SendContainer>
        <input ref={inputRef} placeholder="메시지를 보내세요." />
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
`;

const Chat = styled.li<{ isMine: boolean }>`
  display: flex;
  position: relative;
  margin: 10px;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  color: ${(props) => (props.isMine ? "black" : "blue")};
`;

const MessageText = styled.div`
  display: inline-block;
  position: relative;
  background-color: #fff;
  border-radius: 20px;
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
  border-radius: 20px;
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
    background-color: #4caf50;
    border: none;
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
  }
`;
