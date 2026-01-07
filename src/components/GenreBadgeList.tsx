import { Badge, HStack, Wrap } from "@chakra-ui/react";
import Genre from "../entities/Genre";

interface Props {
  genres: Genre[];
}

const GenreBadgeList = ({ genres }: Props) => {
  return (
    <Wrap marginBottom={3} spacing={1}>
      {genres.map((g) => (
        <Badge
          borderRadius={3}
          colorScheme="orange"
          key={g.id}
          padding={0.5}
          size="xs"
          variant="subtle"
        >
          {g.name.toLowerCase()}
        </Badge>
      ))}
    </Wrap>
  );
};

export default GenreBadgeList;
