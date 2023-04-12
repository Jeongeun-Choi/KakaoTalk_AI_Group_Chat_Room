/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { InputBoxHandle, InputBoxProps } from "./types";

const InputBox = forwardRef<InputBoxHandle, InputBoxProps>(
  (
    { label, placeholder, placeholderStyle, isInvalid, errorText, ...rest },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        getInputValue: () => {
          if (!inputRef.current) {
            return "";
          }

          return inputRef.current.value;
        },
        setInputValue: (value: string) => {
          if (!inputRef.current) {
            return;
          }

          inputRef.current.value = value;
        },
        clearInput: () => {
          if (!inputRef.current) {
            return;
          }
          inputRef.current.value = "";
        },
      }),
      [inputRef]
    );

    return (
      <Box>
        <Text>{label}</Text>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          _placeholder={placeholderStyle}
          isInvalid={isInvalid}
          {...rest}
        />
        {isInvalid && <ErrorText>{errorText}</ErrorText>}
      </Box>
    );
  }
);

export default InputBox;

const ErrorText = styled(Text)`
  font-size: 12px;
  color: crimson;
`;
