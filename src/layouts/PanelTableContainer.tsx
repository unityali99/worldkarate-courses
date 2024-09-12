import { TableContainer } from "@chakra-ui/react";
import React, { ReactNode } from "react";

function PanelTableContainer({ children }: { children: ReactNode }) {
  return (
    <TableContainer
      overflowX="auto"
      className="border border-black border-opacity-20 rounded-lg p-2 md:p-5"
      dir="rtl"
    >
      {children}
    </TableContainer>
  );
}

export default PanelTableContainer;
