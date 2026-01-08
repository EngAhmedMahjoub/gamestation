import { Box, Button, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";
import ActiveFilters from "../components/ActiveFilters";
import {
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  Hide,
} from "@chakra-ui/react";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {/* Hamburger button - mobile only */}
      <Hide above="lg">
        <Button onClick={onOpen} margin={2} variant="outline">
          <HamburgerIcon />
        </Button>
      </Hide>

      {/* Drawer - mobile only */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent>
          <DrawerCloseButton />
          <GenreList />
        </DrawerContent>
      </Drawer>

      {/* Main Grid Layout */}
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box padding={2}>
            <GameHeading />
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector />
              </Box>
              <SortSelector />
            </Flex>
            <ActiveFilters />
          </Box>
          <GameGrid />
        </GridItem>
      </Grid>
    </div>
  );
};

export default HomePage;
