import { useEffect } from "react";
import { useRouter } from "next/router";
import { DBConfigType } from "@/globalType";
import setIndexedDB from "@/hooks/useIndexedDBStore";
import { getActions } from "@/utils/db";

const config: DBConfigType = {
  databaseName: "AI_CHAT",
  version: 1,
  stores: [
    {
      name: "api_key",
      id: { keyPath: "id" },
      columns: [
        { name: "apiKey", keyPath: "apiKey" },
        { name: "id", keyPath: "id" },
        { name: "nickname", keyPath: "nickname" },
      ],
    },
    {
      name: "chat_room_list",
      id: { keyPath: "id", autoIncrement: true },
      columns: [
        { name: "name", keyPath: "name", options: { unique: false } },
        {
          name: "memberCount",
          keyPath: "memberCount",
          options: { unique: false },
        },
      ],
    },
    {
      name: "messages",
      id: { keyPath: "id", autoIncrement: true },
      columns: [
        { name: "roomId", keyPath: "roomId", options: { unique: false } },
        { name: "message", keyPath: "message", options: { unique: false } },
        { name: "isMine", keyPath: "isMine", options: { unique: false } },
        { name: "time", keyPath: "time", options: { unique: false } },
        { name: "userId", keyPath: "userId", options: { unique: false } },
      ],
    },
  ],
};

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    setIndexedDB(config)
      .then(async (res) => {
        console.log(res);
        const { getAll } = getActions("api_key");

        const apiKeys = await getAll();
        return apiKeys;
      })
      .then((apiKeys: any) => {
        if (apiKeys?.length === 0) {
          router.push("/login");
          return;
        }
        if (apiKeys?.length > 0) {
          router.push("/chat-list");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return <div>메인화면</div>;
}

export default HomePage;
