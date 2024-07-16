import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

function FormInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <Box className="space-y-1">
      <Text className="text-start">{label}</Text>
      <Input
        borderColor={"rgba(0,0,0,0.2)"}
        placeholder={placeholder}
        focusBorderColor={"black"}
        dir="ltr"
        size="md"
      />
    </Box>
  );
}

export default FormInput;
