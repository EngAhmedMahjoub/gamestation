import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="lime">
        Nav
      </GridItem>
      <GridItem
        area="aside"
        bg="violet"
        display={{ base: "none", lg: "block" }}
      >
        Aside
      </GridItem>

      <GridItem area="main" bg="blue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
