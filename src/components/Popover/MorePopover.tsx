import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { MorePopoverProps } from "./types";
import styled from "@emotion/styled";

function MorePopover({ triggerElement, bodyContents }: MorePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent>
        <BodyContainer>
          {bodyContents?.map((content) => (
            <Button key={content.text} onClick={content?.onClick}>
              {content.text}
            </Button>
          ))}
        </BodyContainer>
      </PopoverContent>
    </Popover>
  );
}

export default MorePopover;

const BodyContainer = styled(PopoverBody)`
  display: flex;
  flex-direction: column;
`;
