import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import UserCourses from "@/components/UserCourses";
import BackgroundImage from "@/layouts/BackgroundImage";
import UserType from "@/schemas/UserType";
import { cookieKey } from "@/stores/authStore";
import decodeJwt from "@/utils/jwtDecode";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LuShieldCheck, LuUser } from "react-icons/lu";

async function ProfilePage() {
  const token = cookies().get(cookieKey)?.value;
  if (!token || token?.length === 0) return redirect("/auth/login");

  const decodedToken = decodeJwt(token!);
  const { isAdmin, firstName, lastName, email }: UserType = decodedToken;

  return (
    <BackgroundImage image="/kyuna.webp">
      <Box
        minH="100vh"
        px={{ base: 4, md: 6 }}
        pt={{ base: 40, md: 52 }}
        pb={{ base: 20, md: 28 }}
      >
        <Box maxW="1120px" mx="auto">
          <Flex
            dir="rtl"
            align="center"
            direction={{ base: "column", sm: "row" }}
            gap={5}
            mb={{ base: 6, md: 8 }}
            p={{ base: 6, md: 8 }}
            rounded={{ base: "2xl", md: "3xl" }}
            color="white"
            bg="rgba(13, 22, 27, 0.72)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            backdropFilter="blur(12px)"
            shadow="0 16px 45px rgba(0, 0, 0, 0.22)"
          >
            <Flex
              align="center"
              justify="center"
              w={{ base: 16, md: 20 }}
              h={{ base: 16, md: 20 }}
              rounded="2xl"
              bg="rgba(56, 178, 172, 0.18)"
              color="teal.100"
              border="1px solid"
              borderColor="rgba(129, 230, 217, 0.35)"
              flexShrink={0}
            >
              <LuUser size={34} />
            </Flex>
            <Box
              flex="1"
              minW={0}
              w={{ base: "full", sm: "auto" }}
              textAlign={{ base: "center", sm: "right" }}
            >
              <Flex
                align="center"
                justify={{ base: "center", sm: "flex-start" }}
                gap={2}
                mb={2}
              >
                <Heading
                  fontFamily="var(--font-lalezar)"
                  fontWeight="normal"
                  fontSize={{ base: "3xl", md: "4xl" }}
                >
                  {firstName} {lastName}
                </Heading>
                {isAdmin && <LuShieldCheck color="#81e6d9" size={21} />}
              </Flex>
              <Text
                dir="ltr"
                color="whiteAlpha.700"
                fontSize={{ base: "sm", md: "md" }}
                textAlign={{ base: "center", sm: "right" }}
                overflowWrap="anywhere"
              >
                {email}
              </Text>
            </Box>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, md: 8 }}>
            <ProfileForm isAdmin={isAdmin} />
            <ChangePasswordForm />
          </SimpleGrid>

          {!isAdmin && (
            <Box mt={{ base: 6, md: 8 }}>
              <UserCourses />
            </Box>
          )}
        </Box>
      </Box>
    </BackgroundImage>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default ProfilePage;
