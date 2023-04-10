import { Input, Button, InputRightElement } from "@chakra-ui/react";
import { InputProps } from "./types";

function ChatInput({
  errorBorderColor,
  focusBorderColor,
  colorScheme,
  placeholder,
  placeholderStyle,
  ...rest
}: InputProps) {
  return (
    <>
      <Input
        colorScheme={colorScheme}
        errorBorderColor={errorBorderColor}
        focusBorderColor={focusBorderColor}
        placeholder={placeholder}
        _placeholder={placeholderStyle}
        {...rest}
      />
      <InputRightElement pointerEvents="none">
        <Button size="sm">전송</Button>
      </InputRightElement>
    </>
  );
}

export default ChatInput;
