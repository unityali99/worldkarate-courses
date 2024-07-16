import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../../theme";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}

export default Providers;
