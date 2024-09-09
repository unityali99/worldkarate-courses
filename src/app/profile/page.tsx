import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import UserType from "@/schemas/UserType";
import { cookieKey } from "@/stores/authStore";
import { Box, Button, Text } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

function ProfilePage() {
  const token = cookies().get(cookieKey)?.value;
  const { isAdmin }: UserType = jwtDecode(token!);

  return (
    <Box className="space-y-10">
      <ProfileForm isAdmin={isAdmin} key={1} />
      <ChangePasswordForm key={2} />
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ProfilePage;
