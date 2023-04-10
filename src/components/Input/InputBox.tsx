import { Input, Text } from "@chakra-ui/react";
import { InputBoxProps } from "./types";

function InputBox({
  label,
  placeholder,
  placeholderStyle,
  ...rest
}: InputBoxProps) {
  return (
    <>
      <Text>{label}</Text>
      <Input
        placeholder={placeholder}
        _placeholder={placeholderStyle}
        {...rest}
      />
    </>
  );
}

export default InputBox;
