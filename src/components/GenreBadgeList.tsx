import { Badge, HStack, Wrap } from "@chakra-ui/react";
import Genre from "../entities/Genre";

interface Props {
  genres: Genre[];
}

const GenreBadgeList = ({ genres }: Props) => {
  return (
    <Wrap marginBlock={3} spacing={2}>
      {genres.map((g) => (
        <Badge
          borderRadius={3}
          colorScheme="purple"
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
