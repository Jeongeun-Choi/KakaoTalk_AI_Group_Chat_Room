export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
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
  htmlSize?: number;
  isDisabled?: boolean;
  isInValid?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  size?: "lg" | "md" | "sm" | "xs";
  placeholderStyle?: { opacity?: number; color?: string };
}

export interface InputBoxProps extends InputProps {
  label?: string;
}
