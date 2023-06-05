import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { InputBox } from "@/components/Input";
import { InputBoxHandle } from "@/components/Input/types";
import { Button, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getActions } from "@/utils/db";

type IsInvalidType = {
  apiKey: boolean;
  userId: boolean;
};

const errorText = {
  apiKey: "잘못된 형식입니다.",
  userId: "잘못된 형식입니다.",
};

function LoginPage() {
  const { add } = getActions("api_key");
  const router = useRouter();
  const apiKeyinputRef = useRef<InputBoxHandle>(null);
  const idInputRef = useRef<InputBoxHandle>(null);
  const nicknameInputRef = useRef<InputBoxHandle>(null);
  const [isInvalid, setIsInvalid] = useState<IsInvalidType>({
    apiKey: false,
    userId: false,
  });

  const handleSubmitResult = useCallback(async () => {
    if (
      !apiKeyinputRef.current ||
      !idInputRef.current ||
      !nicknameInputRef.current
    ) {
      return;
    }

    const apiKey = apiKeyinputRef.current.getInputValue();
    const userId = idInputRef.current.getInputValue();
    const nickname = nicknameInputRef.current.getInputValue();

    if (!apiKey || !userId) {
      setIsInvalid({ apiKey: !apiKey, userId: !userId });
      return;
    }

    try {
      const response = await add({
        apiKey,
        userId,
        nickname: nickname || "익명", // 닉네임 추가 안했을 경우 '익명'으로 설정
      });
      console.log(response);
      router.push("/chat-list");
    } catch (e) {
      console.error(e);
    }
  }, [add, router]);

  // useEffect(() => {
  //   setIndexedDB(config)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // });
  return (
    <LoginContainer>
      <Main>
        <div>이미지 로고..</div>
        <InputBox
          ref={apiKeyinputRef}
          label="API Key"
          variant="filled"
          isRequired
          isInvalid={isInvalid.apiKey}
          errorText={errorText.apiKey}
        />
        <InputBox
          ref={idInputRef}
          label="아이디"
          variant="filled"
          isRequired
          isInvalid={isInvalid.userId}
          errorText={errorText.userId}
        />
        <InputBox ref={nicknameInputRef} label="닉네임" variant="filled" />
      </Main>
      <Footer>
        <Button onClick={handleSubmitResult}>로그인</Button>
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
  top: 40%;

  div {
    margin-bottom: 10px;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

const Footer = styled.footer`
  width: 90%;
  margin-bottom: 10px;
  text-align: center;
  button {
    width: 100%;
  }
`;
