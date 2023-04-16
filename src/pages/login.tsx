import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { InputBox } from "@/components/Input";
import { InputBoxHandle } from "@/components/Input/types";
import { Button, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getActions } from "@/utils/db";
import setIndexedDB from "@/hooks/useIndexedDBStore";
import { DBConfigType } from "@/globalType";

const config: DBConfigType = {
  databaseName: "AI_CHAT",
  version: 1,
  stores: [
    {
      name: "api_key",
      id: { keyPath: "id", autoIncrement: true },
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

function LoginPage() {
  const { add } = getActions("api_key");
  const router = useRouter();
  const inputRef = useRef<InputBoxHandle>(null);

  const handleSubmitResult = useCallback(async () => {
    if (!inputRef.current) {
      return;
    }

    const apiKey = inputRef.current.getInputValue();

    if (!apiKey) {
      return;
    }

    try {
      console.log();
      const response = await add({ apiKey, id: 1 });
      console.log(response);
      router.push("/chat-list");
    } catch (e) {
      console.error(e);
    }
    // fetch("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify({ apiKey }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
  }, [add, router]);

  useEffect(() => {
    setIndexedDB(config)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <LoginContainer>
      <Main>
        <div>이미지 로고..</div>
        <InputBox ref={inputRef} label="API Key" variant="filled" />
      </Main>
      <Footer>
        <Button onClick={handleSubmitResult}>Login</Button>
        <Link>Key 발급받는법</Link>
      </Footer>
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.main`
  width: 90%;
  position: relative;
  top: 45%;
`;

const Footer = styled.footer`
  width: 90%;
  margin-bottom: 10px;
  text-align: center;
  button {
    width: 100%;
  }
`;
