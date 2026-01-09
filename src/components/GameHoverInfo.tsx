import { Box, VStack } from "@chakra-ui/react";
import Game from "../entities/Game";
import GameGenreList from "./GameGenreList";
import ReleaseDate from "./ReleaseDate";

interface Props {
  game: Game;
}

const GameHoverInfo = ({ game }: Props) => {
  return (
    <Box marginBlockStart="1px">
      <VStack align="start" spacing={2}>
        <GameGenreList genres={game.genres} />
        <ReleaseDate date={game.released} />
      </VStack>
    </Box>
  );
};

export default GameHoverInfo;
