import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";

function NewsLetterForm() {
  return (
    <React.Fragment>
      <Box className="w-full md:w-4/12">
        <Input
          placeholder="Email"
          size={"lg"}
          bgColor={"whitesmoke"}
          textColor={"black"}
        />
      </Box>
      <Button colorScheme="red" size={{ base: "md", md: "lg" }}>
        <IoNewspaperOutline className="mr-3" />
        {"اطلاع از بروزرسانی ها"}
      </Button>
    </React.Fragment>
  );
}

export default NewsLetterForm;
