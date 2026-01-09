import { useState } from "react";
import { Box, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const ScreenshotCarousel = ({ gameId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading screenshots</Text>;
  if (!data?.results || data.results.length === 0)
    return <Text color="gray.500">No screenshots</Text>;

  const screenshots = data.results;
  const current = screenshots[currentIndex];

  return (
    <Box position="relative" height="100%" width="100%">
      <Image
        src={current.image}
        objectFit="cover"
        height="100%"
        width="100%"
        key={currentIndex}
        pointerEvents="none"
      />

      {/* Dot Navigation */}
      <HStack
        position="absolute"
        bottom={3}
        left="50%"
        transform="translateX(-50%)"
        spacing={2}
        zIndex={10}
      >
        {screenshots.map((_, index) => (
          <Box
            key={index}
            as="button"
            width="12px"
            height="12px"
            borderRadius="full"
            bg={index === currentIndex ? "white" : "gray.500"}
            cursor="pointer"
            onMouseEnter={() => setCurrentIndex(index)}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.3)" }}
            padding={0}
            border="none"
          />
        ))}
      </HStack>
    </Box>
  );
};

export default ScreenshotCarousel;
