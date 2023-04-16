import { DBConfigType } from "@/globalType";
import setIndexedDB from "@/hooks/useIndexedDBStore";
import { useEffect } from "react";

const config: DBConfigType = {
  databaseName: "AI_CHAT",
  version: 1,
  stores: [
    {
      name: "api_key",
      id: { keyPath: "id" },
      columns: [{ name: "apiKey", keyPath: "apiKey" }],
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
  ],
};

function HomePage() {
  useEffect(() => {
    setIndexedDB(config)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return <div>메인화면</div>;
}

export default HomePage;
