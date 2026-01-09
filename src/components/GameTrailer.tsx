import useTrailers from "../hooks/useTrailers";
import { Box } from "@chakra-ui/react";

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

  if (isLoading) return null;

  if (error) throw error;

  const first = data?.results[0];

  return first ? (
    <Box
      width="100%"
      height={fillContainer ? "100%" : "auto"}
      bg="black"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <video
        src={first.data[480]}
        poster={first.preview}
        autoPlay={!showControls}
        loop={!showControls}
        controls={showControls}
        style={{
          width: "100%",
          height: fillContainer ? "100%" : "auto",
          objectFit: fillContainer ? "cover" : "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </Box>
  ) : null;
};

export default GameTrailer;
