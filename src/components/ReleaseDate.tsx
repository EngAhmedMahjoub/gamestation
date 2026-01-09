import { Text } from "@chakra-ui/react";

interface Props {
  date: string;
}

const ReleaseDate = ({ date }: Props) => {

    const formattedDate = new Date(date).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return (
      <Text color="gray.500" fontSize="xs" fontFamily="sans-serif">
        Release Date: {formattedDate}
      </Text>
    );
};

export default ReleaseDate;
