import { ButtonProps, PopoverProps } from "@chakra-ui/react";
import { CSSProperties } from "react";

export type BodyContentType = {
  text: string;
  style?: CSSProperties;
  onClick?: () => void;
};
export type MorePopoverProps = {
  triggerElement: React.ReactElement;
  bodyContents?: BodyContentType[];
  buttonSize?: "lg" | "md" | "sm" | "xs";
} & Omit<ButtonProps, "size"> &
  PopoverProps;
