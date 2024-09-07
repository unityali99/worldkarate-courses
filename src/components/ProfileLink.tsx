import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";

function ProfileLink({ fullName }: { fullName: string }) {
  return (
    <Link href={"/profile"}>
      <Flex className="flex-row items-center space-x-3">
        <Text>{fullName}</Text>
        <CgProfile className="hidden md:block" size={20} />
      </Flex>
    </Link>
  );
}

export default ProfileLink;
