import { Text } from "@chakra-ui/react";
import Genre from "../entities/Genre";

interface Props {
  genres: Genre[];
}

const GameGenreList = ({ genres }: Props) => {
  const genreNames = genres.map((g) => g.name).join(", ");

  return (
    <Text color="gray.500" fontSize="xs" fontFamily="sans-serif" marginTop={3}>
      Genres: {genreNames}
    </Text>
  );
};

export default GameGenreList;
