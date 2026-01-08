import { HStack, Tag } from "@chakra-ui/react";
import useGameQueryStore from "../store";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";

const ActiveFilters = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-release", label: "Release Date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();
  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);

  // Map IDs to names
  const genreName = genres?.results.find(
    (g) => g.id === gameQuery.genreId
  )?.name;
  const platformName = platforms?.results.find(
    (p) => p.id === gameQuery.platformId
  )?.name;
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <HStack spacing={2} marginBottom={5}>
      {genreName && (
        <Tag colorScheme="blue" fontWeight="bold">
          {genreName}
        </Tag>
      )}
      {platformName && (
        <Tag colorScheme="green" fontWeight="bold">
          {platformName}
        </Tag>
      )}
      {gameQuery.sortOrder && (
        <Tag colorScheme="purple" fontWeight="bold">
          {currentSortOrder?.label}
        </Tag>
      )}
      {gameQuery.searchText && (
        <Tag colorScheme="orange" fontWeight="bold">
          {gameQuery.searchText}
        </Tag>
      )}
    </HStack>
  );
};

export default ActiveFilters;
