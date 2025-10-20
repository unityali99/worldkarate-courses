import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export default Providers;
