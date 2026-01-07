import { Box, Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card _hover={{ shadow: "lg" }}>
      <Box position="relative">
        <Image
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          }}
          src={getCroppedImageUrl(game.background_image)}
        />
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.400"
          opacity={0}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
        />
      </Box>
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) || []}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          <Link to={"/games/" + game.slug}>{game.name}</Link>
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
