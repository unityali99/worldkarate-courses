import CheckoutLogic from "@/layouts/CheckoutLogic";
import { Box } from "@chakra-ui/react";
import React from "react";

function CheckoutPage() {
  return (
    <Box className="my-20">
      <CheckoutLogic />
    </Box>
  );
}
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default CheckoutPage;
