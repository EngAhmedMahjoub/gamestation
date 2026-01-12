import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
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
import { useLaunchDarklyFlags } from "../launchDarkly/useLaunchDarklyFlags";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get feature flags from LaunchDarkly
  const { showTrailer, showScreenshots, showGameDetails } =
    useLaunchDarklyFlags();

  // Detect if we're on mobile - true for base and sm breakpoints (mobile), false for md and up (desktop)
  const isMobileView = useBreakpointValue({ base: true, sm: true, md: false });

  // On mount, set initial hover state based on device type
  useEffect(() => {
    if (isMobileView === true) {
      setIsHovered(true);
    } else if (isMobileView === false) {
      setIsHovered(false);
    }
  }, [isMobileView]);

  // Fetch trailers and screenshots only when hovered (or by default on mobile)
  // Only fetch if the feature flags are enabled
  const { data: trailersData } = useTrailers(game.id, isHovered && showTrailer);
  const { data: screenshotsData } = useScreenshots(
    game.id,
    isHovered && showScreenshots
  );

  // Determine what to show
  const hasTrailer =
    showTrailer && trailersData?.results && trailersData.results.length > 0;
  const hasScreenshots =
    showScreenshots &&
    screenshotsData?.results &&
    screenshotsData.results.length > 0;

  return (
    <Card
      _hover={{ shadow: "lg" }}
      onPointerEnter={() => !isMobileView && setIsHovered(true)}
      onPointerLeave={() => !isMobileView && setIsHovered(false)}
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
        {isHovered && showGameDetails && <GameHoverInfo game={game} />}
      </CardBody>
    </Card>
  );
};

export default GameCard;
