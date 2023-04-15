import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { MorePopoverProps } from "./types";
import styled from "@emotion/styled";

function MorePopover({
  triggerElement,
  bodyContents,
  buttonSize = "md",
  placement = "bottom",
}: MorePopoverProps) {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <Content>
        <BodyContainer>
          {bodyContents?.map((content) => (
            <Button
              key={content.id}
              data-room-id={content.roomId}
              size={buttonSize}
              style={content?.style}
              onClick={content?.onClick}
            >
              {content.text}
            </Button>
          ))}
        </BodyContainer>
      </Content>
    </Popover>
  );
}

export default MorePopover;

const Content = styled(PopoverContent)`
  width: auto;
`;

const BodyContainer = styled(PopoverBody)`
  display: flex;
  flex-direction: column;
`;
