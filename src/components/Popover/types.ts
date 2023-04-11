export type BodyContentType = {
  text: string;
  onClick?: () => void;
};
export type MorePopoverProps = {
  triggerElement: React.ReactElement;
  bodyContents?: BodyContentType[];
};
