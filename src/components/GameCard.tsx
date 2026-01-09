import { useState } from "react";
import { Box, Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import GameTrailer from "./GameTrailer";
import ScreenshotCarousel from "./ScreenshotCarousel";
import GameHoverInfo from "./GameHoverInfo";
import useTrailers from "../hooks/useTrailers";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fetch trailers and screenshots only when hovered
  const { data: trailersData } = useTrailers(game.id, isHovered);
  const { data: screenshotsData } = useScreenshots(game.id, isHovered);

  // Determine what to show
  const hasTrailer = trailersData?.results && trailersData.results.length > 0;
  const hasScreenshots =
    screenshotsData?.results && screenshotsData.results.length > 0;

  return (
    <Card
      _hover={{ shadow: "lg" }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Box position="relative" height="200px" overflow="hidden" bg="black">
        {/* Show trailer if hovering and has trailer */}
        {isHovered && hasTrailer && (
          <GameTrailer gameId={game.id} fillContainer />
        )}

        {/* Show screenshot carousel if hovering, no trailer but has screenshots */}
        {isHovered && !hasTrailer && hasScreenshots && (
          <ScreenshotCarousel gameId={game.id} />
        )}

        {/* Show game image if not hovering, or if hovering but no trailer/screenshots */}
        {(!isHovered || (!hasTrailer && !hasScreenshots)) && (
          <Image
            src={getCroppedImageUrl(game.background_image)}
            height="100%"
            width="100%"
            objectFit="cover"
          />
        )}

        {/* Overlay - always present */}
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.400"
          opacity={0}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
        />
      </Box>

      {/* Card Body */}
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) || []}
          />
        </HStack>
        <Heading fontSize="2xl">
          <Link to={"/games/" + game.slug}>{game.name}</Link>
          <Emoji rating={game.rating_top} />
        </Heading>

        {/* Hover Info - genres and release date appear here */}
        {isHovered && <GameHoverInfo game={game} />}
      </CardBody>
    </Card>
  );
};

export default GameCard;
