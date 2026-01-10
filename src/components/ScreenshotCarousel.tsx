import { useState, useRef } from "react";
import { Box, HStack, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const ScreenshotCarousel = ({ gameId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading screenshots</Text>;
  if (!data?.results || data.results.length === 0)
    return <Text color="gray.500">No screenshots</Text>;

  const screenshots = data.results;
  const current = screenshots[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;

    // Swipe threshold: 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStart;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <VStack position="relative" height="100%" width="100%" spacing={0}>
      {/* Main Image */}
      <Box
        ref={carouselRef}
        position="relative"
        height="100%"
        width="100%"
        cursor={isDragging ? "grabbing" : "grab"}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={current.image}
          objectFit="cover"
          height="100%"
          width="100%"
          key={currentIndex}
          pointerEvents="none"
          userSelect="none"
        />

        {/* Left tap zone for mobile */}
        <Box
          position="absolute"
          left={0}
          top={0}
          width="30%"
          height="100%"
          cursor="pointer"
          onClick={handlePrevious}
          zIndex={5}
          display={{ base: "block", md: "none" }}
        />

        {/* Right tap zone for mobile */}
        <Box
          position="absolute"
          right={0}
          top={0}
          width="30%"
          height="100%"
          cursor="pointer"
          onClick={handleNext}
          zIndex={5}
          display={{ base: "block", md: "none" }}
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
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setCurrentIndex(index)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.3)" }}
              padding={0}
              border="none"
              pointerEvents="auto"
            />
          ))}
        </HStack>
      </Box>
    </VStack>
  );
};

export default ScreenshotCarousel;
