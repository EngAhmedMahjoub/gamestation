import {
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";
import GameScreenshots from "../components/GameScreenshots";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error || !game) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading>{game.name}</Heading>
        <ExpandableText>{game.description_raw}</ExpandableText>
      </GridItem>
      <GridItem>
        <VStack spacing={5} align="stretch">
          <GameAttributes game={game} />
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
