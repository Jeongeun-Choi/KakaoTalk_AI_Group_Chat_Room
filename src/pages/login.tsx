import { useRef } from "react";
import { InputBox } from "@/components/Input";
import { InputBoxHandle } from "@/components/Input/types";
import { Button, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";

function LoginPage() {
  const inputRef = useRef<InputBoxHandle>(null);

  return (
    <LoginContainer>
      <Main>
        <div>이미지 로고..</div>
        <InputBox ref={inputRef} label="API Key" />
      </Main>
      <Footer>
        <Button>Login</Button>
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
