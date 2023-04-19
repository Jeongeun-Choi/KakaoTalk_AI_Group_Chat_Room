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
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { getActions } from "@/utils/db";

function ChatRoom() {
  const { getAll: getApiKeys } = getActions("api_key");
  const { getAll, add } = getActions("messages");

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
    getAll().then((res) => {
      setMessageList(res);
    });
  }, []);

  useEffect(() => {
    getApiKeys().then((res) => {
      console.log("key", res[0].apiKey);
      setApiKey(res[0]?.apiKey || "");
    });
  }, []);

  return (
    <>
      <ul>
        {messageList.map((message, index) => (
          <li key={index} style={{ color: message?.isMine ? "black" : "blue" }}>
            {message?.message}
          </li>
        ))}
      </ul>
      <div>
        <input ref={inputRef} placeholder="메시지를 보내세요." />
        <button onClick={handleSubmitChat}>전송</button>
      </div>
    </>
  );
}

export default ChatRoom;
