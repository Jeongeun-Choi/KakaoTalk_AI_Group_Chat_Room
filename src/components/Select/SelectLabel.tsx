import { useState } from "react";
import { Text, Select } from "@chakra-ui/react";
import { SelectLabelProps } from "./types";

function SelectLabel({
  label,
  value,
  onChangeValue,
  ...rest
}: SelectLabelProps) {
  return (
    <>
      <Text>{label}</Text>
      <Select
        placeholder="Select option"
        value={value}
        onChange={onChangeValue}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </Select>
    </>
  );
}

export default SelectLabel;
