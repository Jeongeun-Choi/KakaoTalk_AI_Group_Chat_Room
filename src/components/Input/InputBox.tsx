import { Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { InputBoxProps } from "./types";

function InputBox({
  label,
  placeholder,
  placeholderStyle,
  isInvalid,
  errorText,
  ...rest
}: InputBoxProps) {
  return (
    <>
      <Text>{label}</Text>
      <Input
        placeholder={placeholder}
        _placeholder={placeholderStyle}
        isInvalid={isInvalid}
        {...rest}
      />
      {isInvalid && <ErrorText>{errorText}</ErrorText>}
    </>
  );
}

export default InputBox;

const ErrorText = styled(Text)`
  font-size: 12px;
  color: crimson;
`;
