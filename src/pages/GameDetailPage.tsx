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
import GameBreadcrumb from "../components/GameBreadcrumb";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error || !game) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <GameBreadcrumb gameName={game.name} />
        <Heading>{game.name}</Heading>
        <ExpandableText>{game.description_raw}</ExpandableText>
      </GridItem>
      <GridItem>
        <GameAttributes game={game} />
        <GameTrailer gameId={game.id} showControls={true} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
