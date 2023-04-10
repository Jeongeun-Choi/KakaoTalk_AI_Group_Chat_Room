import { ReactElement, JSXElementConstructor, ChangeEventHandler } from "react";

export type SelectProps = {
  colorScheme?:
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram";
  errorBorderColor?: string;
  focusBorderColor?: string;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  iconColor?: string;
  iconSize?: string;
  isDisabled?: boolean;
  isInValid?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  size?: "lg" | "md" | "sm" | "xs";
};

export interface SelectLabelProps extends SelectProps {
  label?: string;
  value?: string;
  onChangeValue: (event: ChangeEventHandler<HTMLSelectElement>) => void;
}
