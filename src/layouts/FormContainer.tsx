import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

function FormContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      className="mx-auto w-full md:w-7/12 p-10 text-center border border-black border-opacity-20 rounded-lg"
      dir="rtl"
    >
      <Box className="xl:mx-48 2xl:mx-64 space-y-6">{children}</Box>
    </Box>
  );
}

export default FormContainer;
