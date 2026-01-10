import useTrailers from "../hooks/useTrailers";
import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface Props {
  gameId: number;
  fillContainer?: boolean;
  showControls?: boolean;
}

const GameTrailer = ({
  gameId,
  fillContainer = false,
  showControls = false,
}: Props) => {
  const { data, error, isLoading } = useTrailers(gameId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) return null;

  if (error) throw error;

  const first = data?.results[0];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return first ? (
    <Box
      position="relative"
      width="100%"
      height={fillContainer ? "100%" : "auto"}
      bg="black"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <video
        ref={videoRef}
        src={first.data[480]}
        poster={first.preview}
        autoPlay={showControls}
        loop={!showControls}
        controls={showControls}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: "100%",
          height: fillContainer ? "100%" : "auto",
          objectFit: fillContainer ? "cover" : "contain",
          objectPosition: "center",
          display: "block",
        }}
      />

      {/* Play button overlay for card hover */}
      {fillContainer && !isPlaying && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={10}
          cursor="pointer"
          onClick={togglePlayPause}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="80px"
          height="80px"
          borderRadius="50%"
          bg="rgba(255, 255, 255, 0.15)"
          backdropFilter="blur(4px)"
          border="2px solid rgba(255, 255, 255, 0.25)"
          _hover={{
            bg: "rgba(255, 255, 255, 0.25)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
          }}
          transition="all 0.2s ease"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </Box>
      )}
    </Box>
  ) : null;
};

export default GameTrailer;
