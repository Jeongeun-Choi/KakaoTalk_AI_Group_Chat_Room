import { Input, Button, InputRightElement, InputGroup } from "@chakra-ui/react";
import { InputProps } from "./types";
import styled from "@emotion/styled";

function ChatInput({
  errorBorderColor,
  focusBorderColor,
  colorScheme,
  placeholder,
  placeholderStyle,
  ...rest
}: InputProps) {
  return (
    <InputGroup>
      <Input
        colorScheme={colorScheme}
        errorBorderColor={errorBorderColor}
        focusBorderColor={focusBorderColor}
        placeholder={placeholder}
        _placeholder={placeholderStyle}
        {...rest}
      />
      <InputRightContainer>
        <Button>전송</Button>
      </InputRightContainer>
    </InputGroup>
  );
}

export default ChatInput;

const InputRightContainer = styled(InputRightElement)`
  top: 4px;
  right: 6px;
  width: 80px;

  button {
    width: 80px;
  }
`;
