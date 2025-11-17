import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { LuUser } from "react-icons/lu";

function ProfileLink({ fullName }: { fullName: string }) {
  return (
    <Link href="/profile">
      <Flex className="flex-row items-center gap-2">
        <Text>{fullName}</Text>
        <LuUser size={18} />
      </Flex>
    </Link>
  );
}

export default ProfileLink;
