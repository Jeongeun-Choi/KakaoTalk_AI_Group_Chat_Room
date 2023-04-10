import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

type ListItemProps = {
  memberCount: number;
};

function ListItem({ memberCount }: ListItemProps) {
  return (
    <ItemContainer>
      <div>방 이름</div>
      <div>[{memberCount}]</div>
    </ItemContainer>
  );
}

export default ListItem;

const ItemContainer = styled(Box)`
  display: flex;
  justify-content: space;
`;
